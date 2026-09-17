# Task 02 — In-App Live Document Viewer Engine (Zero Download Preview)

## Overview

Build a universal, in-app live document preview engine (`LiveDocumentViewerModal`) that enables both staff and customers to view uploaded PDF and image documents directly inside an interactive modal overlay without downloading binary files to local storage.

## Requirements

- **REQ-002**: `2- اقدر اشوف كل مستند لايف جوا المنصه مش لازم احمله` (Staff and customer can preview every document live inside the platform without downloading).

## Current Implementation

- **Component**: `components/shared/LiveDocumentViewerModal.tsx`
- **Integrations**:
  - `components/portal/documents/DocumentTable.tsx` (Customer portal document preview button)
  - `components/admin/customers/CustomerDetailDrawer.tsx` (Staff customer inspection document preview button)
- **API Download / Stream Route**: `GET /api/portal/documents/[id]/download`

## Files / Modules Affected

- `components/shared/LiveDocumentViewerModal.tsx`
- `components/portal/documents/DocumentTable.tsx`
- `components/admin/customers/CustomerDetailDrawer.tsx`
- `app/api/portal/documents/[id]/download/route.ts`

## Data / Architecture Changes

- No schema changes required.
- `GET /api/portal/documents/[id]/download` returns binary stream with appropriate `Content-Type` (`application/pdf`, `image/jpeg`, `image/png`, `image/webp`) and `Content-Disposition: inline` for browser rendering.

## UI / UX Changes

- **Preview Trigger**: Interactive **Eye 👁️** icon button on every document row in client and staff document tables.
- **Modal Overlay**:
  - Dark backdrop with backdrop-blur.
  - Live PDF viewer iframe with zoom and toolbar support.
  - Responsive image lightbox viewer for JPEG, PNG, and WEBP formats.
  - Floating controls for "Open Full Screen", "Download Copy", and "Close".
  - Loading spinner overlay while stream resolves.

## Implementation Plan

1. Create `components/shared/LiveDocumentViewerModal.tsx` with Framer Motion animations.
2. Implement format detection (Image vs PDF) based on `mimeType` or file extension.
3. Embed `<iframe>` for PDFs and `<img>` for image formats with loading state handlers.
4. Integrate preview trigger buttons in `DocumentTable.tsx` and `CustomerDetailDrawer.tsx`.

## Small Tasks

- [x] Create `LiveDocumentViewerModal.tsx` component.
- [x] Implement PDF iframe embed with `#toolbar=1` parameter.
- [x] Implement Image viewer container with aspect ratio handling.
- [x] Add Eye 👁️ button to `DocumentTable.tsx`.
- [x] Add Eye 👁️ button to `CustomerDetailDrawer.tsx`.
- [x] Add loading spinner state during document loading.
- [x] Test live preview on Chrome, Firefox, and mobile Safari browsers.

## Edge Cases

- Large 10MB PDF files (Displays loading spinner until stream buffers).
- Unsupported MIME types (Falls back to iframe with download option).
- Network stream timeout (Displays friendly retry error message).

## Testing Checklist

- [x] PDF Preview: Eye button opens modal -> PDF renders cleanly inside iframe.
- [x] Image Preview: Eye button opens modal -> Image displays in lightbox.
- [x] Customer view: Customer clicks Eye -> Preview opens without triggering file download.
- [x] Staff view: Staff clicks Eye inside customer drawer -> Preview opens live.

## Acceptance Criteria

- Previewing a document opens an in-app modal overlay rendering the file live.
- Zero local downloads are required to view PDF or image contents.
- Viewer works seamlessly across customer portal and staff inspection drawer.

## Dependencies

- Task 01 (Staff Customer 360 Workspace).

## AI_MAP Impact

- `API_INVENTORY.md`
- `TEST_GUIDE.md`
