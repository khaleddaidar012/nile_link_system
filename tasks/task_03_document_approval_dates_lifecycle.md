# Task 03 — Document Review Approval with Validity Start & Expiration Dates Lifecycle

## Overview

Enable staff reviewers to approve customer documents while setting or editing the official validity start date (`startDate`) and expiration date (`expiryDate`). These dates persist in MongoDB and immediately reflect live on the customer's portal dashboard, document registry tables, and health alert status badges.

## Requirements

- **REQ-003**: `3- اوافق علي المستند واحط تاريخ الابتداء والانتهاء ويظهر عند العميل` (Staff can approve a document and set start and expiry dates, which immediately reflect on the customer's portal).

## Current Implementation

- **Review Modal**: `components/admin/review/DocumentReviewModal.tsx`
- **Verification API**: `POST /api/admin/documents/[id]/verify`
- **Document Model**: `lib/models/Document.ts` (Includes `startDate` and `expiryDate` fields)
- **Customer Views**:
  - `components/portal/documents/DocumentTable.tsx`
  - `components/portal/DashboardMetricsCards.tsx`
  - `components/shared/ExpiryStatusBadge.tsx`

## Files / Modules Affected

- `components/admin/review/DocumentReviewModal.tsx`
- `app/api/admin/documents/[id]/verify/route.ts`
- `lib/models/Document.ts`
- `components/portal/documents/DocumentTable.tsx`
- `components/shared/ExpiryStatusBadge.tsx`

## Data / Architecture Changes

- `POST /api/admin/documents/[id]/verify` accepts `startDate` and `expiryDate` payload parameters when `status === "approved"`.
- Calculates auto-default expiration date based on the category's `defaultValidityDays` setting if not specified manually.
- Updates document `status` to `"approved"` (or `"expiring_soon"` if expiry is within 10 days).

## UI / UX Changes

- **Review Modal Approval Controls**:
  - Green "Approve Document" decision selector.
  - Date picker for "Issue / Validity Start Date" (`startDate`).
  - Date picker for "Expiration Date" (`expiryDate`).
  - Auto-calculation helper button based on document category validity rules.
- **Customer Portal Display**:
  - Validity Start Date column in `DocumentTable.tsx`.
  - Expiry Date column in `DocumentTable.tsx`.
  - Dynamic `ExpiryStatusBadge` rendering "Approved / Active", "Expiring Soon (≤10d)", or "Expired".

## Implementation Plan

1. Verify `startDate` and `expiryDate` fields in `DocumentReviewModal.tsx` form state.
2. Connect category selection to auto-fill default validity period.
3. Submit payload to `POST /api/admin/documents/[id]/verify`.
4. Ensure `DocumentTable.tsx` formats and displays `startDate` and `expiryDate` cleanly.

## Small Tasks

- [x] Add date pickers for `startDate` and `expiryDate` in `DocumentReviewModal.tsx`.
- [x] Connect `handleCategoryChange` to auto-calculate default expiry date.
- [x] Update `POST /api/admin/documents/[id]/verify` endpoint to store dates in MongoDB.
- [x] Update `DocumentTable.tsx` table columns for Validity Start and Expiry Date.
- [x] Render dynamic `ExpiryStatusBadge` based on computed days remaining.
- [x] Test approval flow and verify dates display on client portal.

## Edge Cases

- Expiry date set in the past (System sets status to `"expired"`).
- Expiry date set within 10 days (System sets status to `"expiring_soon"` and triggers warning pill).
- No start date provided (Defaults to current server date).

## Testing Checklist

- [x] Approval flow: Staff selects "Approve", sets start & expiry dates, clicks Save -> Document status changes to approved.
- [x] Client Reflection: Customer opens portal -> Document table displays exact start & expiry dates.
- [x] Expiry badge: Document with expiry in 5 days renders yellow "Expiring Soon" badge.

## Acceptance Criteria

- Staff can approve any pending document while specifying validity start and expiration dates.
- Approved dates save to MongoDB and reflect immediately on the customer portal.
- Expiration badges automatically compute and display remaining validity days.

## Dependencies

- Task 01 (Staff Customer 360 Workspace).

## AI_MAP Impact

- `API_INVENTORY.md`
- `TEST_GUIDE.md`
