import { describe, expect, it } from "vitest";
import {
  ASSET_TYPE,
  CLAIM_REJECTION_REASON_MAX,
  CLAIM_TYPE,
  COLUMN_CATEGORY,
  CURRENCY_CODE,
  EXPENSES_CLAIM_COLUMN_CATEGORY,
  EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL_ZH,
  EXPENSES_CLAIM_COLUMN_POSITION,
  FX_MODE,
  ISSUE_PRIORITY,
  ISSUE_PRIORITY_LABEL,
  ISSUE_TYPE,
  ORGANIZATION_ROLE,
  PAYMENT_METHOD,
  PERMISSION,
  PERMISSION_LABEL,
  REQUEST_LOG_METHOD,
  getAssetTypeLabel,
  getClaimTypeLabel,
  getCurrencyCodeLabel,
  getExpensesClaimColumnCategoryLabel,
  getExpensesClaimColumnCategoryLabelZh,
  getFxModeLabel,
  getIssuePriorityLabel,
  getIssueTypeLabel,
  getPaymentMethodLabel,
  getPermissionLabel,
  getRequestLogMethodLabel,
  isClaimReasonRequired,
  mappingEntries,
} from "../src";

describe("shared mapping constants", () => {
  it("keeps organization roles stable", () => {
    expect(ORGANIZATION_ROLE).toEqual({
      OWNER: 0,
      ADMIN: 1,
      MEMBER: 2,
      GUEST: 3,
    });
  });

  it("keeps issue priority order sortable from lowest to highest", () => {
    expect(ISSUE_PRIORITY).toEqual({
      LOW: 0,
      MEDIUM: 1,
      HIGH: 2,
      URGENT: 3,
    });
  });

  it("keeps column category order sortable from todo to done", () => {
    expect(COLUMN_CATEGORY).toEqual({
      BACKLOG: 0,
      TODO: 1,
      IN_PROGRESS: 2,
      REVIEW: 3,
      BLOCKED: 4,
      DONE: 5,
      CANCELLED: 6,
    });
  });

  it("appends expenses claim column categories without renumbering 0-5", () => {
    expect(EXPENSES_CLAIM_COLUMN_CATEGORY).toEqual({
      DRAFT: 0,
      PENDING_REVIEW: 1,
      REVIEWED: 2,
      APPROVED: 3,
      COMPLETED: 4,
      REJECTED: 5,
      CATEGORY_VERIFIED: 6,
      RECEIVED: 7,
    });
  });

  it("labels expenses claim columns in english and chinese", () => {
    expect(
      getExpensesClaimColumnCategoryLabel(
        EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED,
      ),
    ).toBe("Verified");
    expect(
      getExpensesClaimColumnCategoryLabel(
        EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED,
      ),
    ).toBe("Received");
    expect(
      getExpensesClaimColumnCategoryLabelZh(
        EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED,
      ),
    ).toBe("已核对");
    expect(
      getExpensesClaimColumnCategoryLabelZh(
        EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED,
      ),
    ).toBe("已收款");
  });

  it("uses the chinese column names the product actually seeds", () => {
    const zh = EXPENSES_CLAIM_COLUMN_CATEGORY_LABEL_ZH;
    expect(zh[EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]).toBe("待审批");
    expect(zh[EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]).toBe("已审批");
    expect(zh[EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]).toBe("已出款");
  });

  it("orders expenses claim board positions by workflow, not category", () => {
    expect(EXPENSES_CLAIM_COLUMN_POSITION).toEqual({
      [EXPENSES_CLAIM_COLUMN_CATEGORY.DRAFT]: 0,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW]: 1,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED]: 2,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED]: 3,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED]: 4,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED]: 5,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED]: 6,
      [EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED]: 7,
    });
    expect(
      EXPENSES_CLAIM_COLUMN_POSITION[
        EXPENSES_CLAIM_COLUMN_CATEGORY.CATEGORY_VERIFIED
      ],
    ).toBeLessThan(
      EXPENSES_CLAIM_COLUMN_POSITION[EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED],
    );
    expect(
      EXPENSES_CLAIM_COLUMN_POSITION[EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED],
    ).not.toBe(EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED);
  });

  it("requires a reason only on rejection and on non-receipt", () => {
    expect(
      isClaimReasonRequired(
        EXPENSES_CLAIM_COLUMN_CATEGORY.PENDING_REVIEW,
        EXPENSES_CLAIM_COLUMN_CATEGORY.REJECTED,
      ),
    ).toBe(true);
    expect(
      isClaimReasonRequired(
        EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED,
        EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED,
      ),
    ).toBe(true);
    expect(
      isClaimReasonRequired(
        EXPENSES_CLAIM_COLUMN_CATEGORY.REVIEWED,
        EXPENSES_CLAIM_COLUMN_CATEGORY.APPROVED,
      ),
    ).toBe(false);
    expect(
      isClaimReasonRequired(
        EXPENSES_CLAIM_COLUMN_CATEGORY.COMPLETED,
        EXPENSES_CLAIM_COLUMN_CATEGORY.RECEIVED,
      ),
    ).toBe(false);
    expect(CLAIM_REJECTION_REASON_MAX).toBe(1000);
  });

  it("keeps asset type mapping stable", () => {
    expect(ASSET_TYPE).toEqual({
      VEHICLE: 0,
      LAPTOP: 1,
      PROJECTOR: 2,
      EQUIPMENT: 3,
      FURNITURE: 4,
      MONITOR: 5,
      PRINTER: 6,
      CAMERA: 7,
      TABLET: 8,
      MOBILE_DEVICE: 9,
      OTHER: 10,
    });
    expect(getAssetTypeLabel(ASSET_TYPE.EQUIPMENT)).toBe("Equipment");
    expect(getAssetTypeLabel(ASSET_TYPE.OTHER)).toBe("Other");
  });

  it("keeps payment method mapping stable", () => {
    expect(PAYMENT_METHOD).toEqual({
      CASH: 0,
      CREDIT_CARD: 1,
      BANK_TRANSFER: 2,
      E_WALLET: 3,
      COMPANY_CARD: 4,
    });
    expect(getPaymentMethodLabel(PAYMENT_METHOD.CASH)).toBe("Cash");
    expect(getPaymentMethodLabel(PAYMENT_METHOD.COMPANY_CARD)).toBe(
      "Company card",
    );
  });

  it("keeps claim type mapping stable", () => {
    expect(CLAIM_TYPE).toEqual({
      RECEIPT: 0,
      MILEAGE: 1,
      PER_DIEM: 2,
      ADVANCE: 3,
    });
    expect(getClaimTypeLabel(CLAIM_TYPE.RECEIPT)).toBe("Receipt");
    expect(getClaimTypeLabel(CLAIM_TYPE.PER_DIEM)).toBe("Per diem");
    expect(getClaimTypeLabel(CLAIM_TYPE.ADVANCE)).toBe("Advance");
  });

  it("keeps currency code mapping stable", () => {
    expect(CURRENCY_CODE).toEqual({
      MYR: 0,
      CNY: 1,
      VND: 2,
      USD: 3,
      USDT: 4,
    });
    expect(getCurrencyCodeLabel(CURRENCY_CODE.MYR)).toBe("MYR");
    expect(getCurrencyCodeLabel(CURRENCY_CODE.USDT)).toBe("USDT");
  });

  it("keeps fx mode mapping stable", () => {
    expect(FX_MODE).toEqual({
      DECLARED: 0,
      TABLE: 1,
    });
    expect(getFxModeLabel(FX_MODE.DECLARED)).toBe("Bank charge");
    expect(getFxModeLabel(FX_MODE.TABLE)).toBe("Converted at rate");
  });

  it("returns issue labels from numeric mapping values", () => {
    expect(ISSUE_PRIORITY_LABEL[ISSUE_PRIORITY.HIGH]).toBe("High");
    expect(getIssuePriorityLabel(ISSUE_PRIORITY.URGENT)).toBe("Urgent");
    expect(getIssueTypeLabel(ISSUE_TYPE.SUBTASK)).toBe("Subtask");
  });

  it("converts mappings into stable entries for tables and filters", () => {
    expect(mappingEntries(ISSUE_TYPE)).toEqual([
      { key: "EPIC", value: 0 },
      { key: "TASK", value: 1 },
      { key: "BUG", value: 2 },
      { key: "FEATURE", value: 3 },
      { key: "SUBTASK", value: 4 },
    ]);
  });

  it("keeps request log method mapping stable", () => {
    expect(REQUEST_LOG_METHOD).toEqual({
      GET: 0,
      POST: 1,
      PUT: 2,
      PATCH: 3,
      DELETE: 4,
    });
    expect(getRequestLogMethodLabel(0)).toBe("GET");
    expect(getRequestLogMethodLabel(4)).toBe("DELETE");
  });

  it("keeps permission constants stable", () => {
    expect(PERMISSION).toEqual({
      ORG_MANAGE: "org.manage",
      MEMBER_INVITE: "member.invite",
      ANNOUNCEMENT_MANAGE: "announcement.manage",
      PROJECT_CREATE: "project.create",
      PROJECT_UPDATE: "project.update",
      PROJECT_DELETE: "project.delete",
      ISSUE_KANBAN_CREATE: "issue.kanban.create",
      ISSUE_KANBAN_UPDATE: "issue.kanban.update",
      ISSUE_KANBAN_DELETE: "issue.kanban.delete",
      ISSUE_EXPENSES_CLAIM_CREATE: "issue.expenses_claim.create",
      ISSUE_EXPENSES_CLAIM_EDIT: "issue.expenses_claim.edit",
      ISSUE_EXPENSES_CLAIM_UPDATE: "issue.expenses_claim.update",
      ISSUE_EXPENSES_CLAIM_DELETE: "issue.expenses_claim.delete",
      EXPENSES_CLAIM_CATEGORY_MANAGE: "expenses_claim.category.manage",
      ISSUE_VENUE_BOOKING_CREATE: "issue.venue_booking.create",
      ISSUE_VENUE_BOOKING_EDIT: "issue.venue_booking.edit",
      ISSUE_VENUE_BOOKING_UPDATE: "issue.venue_booking.update",
      ISSUE_VENUE_BOOKING_DELETE: "issue.venue_booking.delete",
      ISSUE_ASSET_BOOKING_CREATE: "issue.asset_booking.create",
      ISSUE_ASSET_BOOKING_EDIT: "issue.asset_booking.edit",
      ISSUE_ASSET_BOOKING_UPDATE: "issue.asset_booking.update",
      ISSUE_ASSET_BOOKING_DELETE: "issue.asset_booking.delete",
      ACCOUNTING_ACCOUNT_MANAGE: "accounting.account.manage",
      ACCOUNTING_LEDGER_READ: "accounting.ledger.read",
      ACCOUNTING_JOURNAL_POST: "accounting.journal.post",
      ACCOUNTING_JOURNAL_REVERSE: "accounting.journal.reverse",
      ACCOUNTING_PERIOD_CLOSE: "accounting.period.close",
      ACCOUNTING_EXCHANGE_RATE_MANAGE: "accounting.exchange_rate.manage",
      ACCOUNTING_INVOICE_MANAGE: "accounting.invoice.manage",
      ACCOUNTING_INVOICE_ISSUE: "accounting.invoice.issue",
      ACCOUNTING_BANK_RECONCILE: "accounting.bank.reconcile",
      ACCOUNTING_CLAIM_RATE_MANAGE: "accounting.claim_rate.manage",
    });
  });

  it("keeps permission label map stable", () => {
    expect(PERMISSION_LABEL).toEqual({
      [PERMISSION.ORG_MANAGE]: "Manage Organization",
      [PERMISSION.MEMBER_INVITE]: "Invite Members",
      [PERMISSION.ANNOUNCEMENT_MANAGE]: "Manage Announcements",
      [PERMISSION.PROJECT_CREATE]: "Create Projects",
      [PERMISSION.PROJECT_UPDATE]: "Update Projects",
      [PERMISSION.PROJECT_DELETE]: "Delete Projects",
      [PERMISSION.ISSUE_KANBAN_CREATE]: "Create Kanban Issues",
      [PERMISSION.ISSUE_KANBAN_UPDATE]: "Update Kanban Issues",
      [PERMISSION.ISSUE_KANBAN_DELETE]: "Delete Kanban Issues",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_CREATE]: "Create Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_EDIT]: "Edit Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_UPDATE]: "Update Expense Claims",
      [PERMISSION.ISSUE_EXPENSES_CLAIM_DELETE]: "Delete Expense Claims",
      [PERMISSION.EXPENSES_CLAIM_CATEGORY_MANAGE]:
        "Manage Expense Claim Categories",
      [PERMISSION.ISSUE_VENUE_BOOKING_CREATE]: "Create Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_EDIT]: "Edit Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_UPDATE]: "Update Venue Bookings",
      [PERMISSION.ISSUE_VENUE_BOOKING_DELETE]: "Delete Venue Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_CREATE]: "Create Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_EDIT]: "Edit Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_UPDATE]: "Update Asset Bookings",
      [PERMISSION.ISSUE_ASSET_BOOKING_DELETE]: "Delete Asset Bookings",
      [PERMISSION.ACCOUNTING_ACCOUNT_MANAGE]: "Manage Chart of Accounts",
      [PERMISSION.ACCOUNTING_LEDGER_READ]: "View Ledger",
      [PERMISSION.ACCOUNTING_JOURNAL_POST]: "Post Journal Entries",
      [PERMISSION.ACCOUNTING_JOURNAL_REVERSE]: "Reverse Journal Entries",
      [PERMISSION.ACCOUNTING_PERIOD_CLOSE]: "Close Fiscal Periods",
      [PERMISSION.ACCOUNTING_EXCHANGE_RATE_MANAGE]: "Manage Exchange Rates",
      [PERMISSION.ACCOUNTING_INVOICE_MANAGE]: "Manage Invoices",
      [PERMISSION.ACCOUNTING_INVOICE_ISSUE]: "Issue Invoices",
      [PERMISSION.ACCOUNTING_BANK_RECONCILE]: "Reconcile Bank Accounts",
      [PERMISSION.ACCOUNTING_CLAIM_RATE_MANAGE]: "Manage Claim Rates",
    });
  });

  it("returns permission labels from string mapping values", () => {
    expect(getPermissionLabel(PERMISSION.ORG_MANAGE)).toBe("Manage Organization");
    expect(getPermissionLabel(PERMISSION.MEMBER_INVITE)).toBe("Invite Members");
    expect(getPermissionLabel(PERMISSION.ANNOUNCEMENT_MANAGE)).toBe(
      "Manage Announcements",
    );
  });
});
