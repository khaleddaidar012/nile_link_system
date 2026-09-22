import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongodb"
import { Document as DocumentModel } from "@/lib/models"
import { getSessionFromRequest } from "@/lib/auth/token-service"

type Props = {
  params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const session = await getSessionFromRequest(req)
    if (!session || (session.role !== "staff" && session.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden: Staff access required" }, { status: 403 })
    }

    if (session.role === "staff" && !session.staffPermissions?.canReviewDocuments) {
      return NextResponse.json(
        { error: "Access denied. You lack the 'canReviewDocuments' permission." },
        { status: 403 }
      )
    }

    const { id } = await params
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing document ID" }, { status: 400 })
    }

    await connectDB()
    const document = await DocumentModel.findById(id)
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    await DocumentModel.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: "Document permanently deleted",
    })
  } catch (error: unknown) {
    console.error("Document delete error:", error)
    return NextResponse.json({ error: "Internal server error during document deletion" }, { status: 500 })
  }
}
