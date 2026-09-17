# Task 01 — Staff Customer 360 Workspace & Account Verification Governance

## Overview

Provide staff members with a dedicated 360° inspection workspace when selecting any customer account from the staff portal directory (`/admin/customers`). This workspace allows staff to audit customer compliance health, inspect registered legal documents, view company contact details, and toggle the customer's account verification status (`Active` / `Warning` / `Restricted`).

## Requirements

- **REQ-001**: `1-بالنسبة للموضف بضغط علي حساب العميل بيفتح كانها صفحة احترافيه بقدر اشوف حساب العميل من عندي ك موظف` (When a staff member clicks on a customer account, it opens a dedicated 360° workspace to view customer metrics, documents, and profile).
- **REQ-005**: `5-من جوا الصفحة بتاع حساب العميل ليا انا ك موظف بقدر اعمل ان الحساب موثق ولا لاء يعني افعل والغي تفعيل` (Staff can toggle whether the customer account is verified or unverified/restricted).

## Current Implementation

- **Existing Route**: `app/[locale]/admin/customers/page.tsx`
- **Existing Component**: `components/admin/customers/CustomerOverviewTable.tsx`
- **Existing Inspection Workspace**: `components/admin/customers/CustomerDetailDrawer.tsx`
- **Existing API Routes**:
  - `GET /api/admin/customers`
  - `GET /api/admin/customers/[id]`
  - `PATCH /api/admin/customers/[id]/status`

## Files / Modules Affected

- `app/[locale]/admin/customers/page.tsx`
- `components/admin/customers/CustomerOverviewTable.tsx`
- `components/admin/customers/CustomerDetailDrawer.tsx`
- `app/api/admin/customers/[id]/route.ts`
- `app/api/admin/customers/[id]/status/route.ts`
- `lib/models/Customer.ts`
- `lib/models/User.ts`

## Data / Architecture Changes

- Extend `Customer` model schema to support `accountStatus` enum (`active`, `warning`, `inactive`) and `statusReason`.
- Extend `PATCH /api/admin/customers/[id]/status` to update `accountStatus` and dispatch in-app notifications to the customer user.

## UI / UX Changes

- **Customer Row Interaction**: Clicking any row in `CustomerOverviewTable` opens the `CustomerDetailDrawer` smooth slide-over workspace.
- **360° Tabbed Layout**: Includes "Documents Registry", "Account Governance", and "Company Contacts".
- **Verification Toggle Switch**: Prominent 3-state control (`Active (Compliant)`, `Warning (Action Needed)`, `Restricted`) with an input field for administrative audit notes.

## Implementation Plan

1. Verify `CustomerDetailDrawer` component structure and tab navigation.
2. Connect `CustomerOverviewTable` click events to trigger the inspection drawer with the target `customerId`.
3. Implement `handleUpdateStatus` to call `PATCH /api/admin/customers/[id]/status` when staff toggles verification standing.
4. Ensure real-time state refresh on both the staff drawer and the customer portal dashboard.

## Small Tasks

- [x] Inspect existing customer directory table and drawer components.
- [x] Add click handler on customer rows to trigger 360° drawer.
- [x] Render KPI stat cards (Approved, Expiring, Pending, Status) inside drawer header.
- [x] Add status governance toggle buttons (`Active`, `Warning`, `Restricted`) in Governance tab.
- [x] Connect `PATCH /api/admin/customers/[id]/status` API endpoint.
- [x] Broadcast notification to customer upon status change.
- [x] Test responsive layout on mobile and desktop viewports.

## Edge Cases

- Customer has no uploaded documents yet (Defaults to `warning` with "Pending document upload" reason).
- Staff revokes verification for an active customer (Transitions status to `inactive` / `restricted` and locks cargo operations).
- Unsaved status reason notes (Auto-populates fallback explanation).

## Testing Checklist

- [x] Normal flow: Click customer row -> Drawer opens -> Change status -> Status persists in DB.
- [x] Verification Toggle: Switch from `warning` to `active` -> Customer portal reflects active status.
- [x] Mobile layout: Drawer occupies full screen on small screens with clean close button.
- [x] Permissions: Unauthorized non-staff requests to status API return 403 Forbidden.

## Acceptance Criteria

- Staff can click any customer in `/admin/customers` to inspect full company details and compliance stats.
- Staff can toggle account verification status between `Active`, `Warning`, and `Restricted`.
- Changes save immediately and update customer portal metrics in real time.

## Dependencies

- None (Base feature).

## AI_MAP Impact

- `API_INVENTORY.md`
- `TEST_GUIDE.md`
