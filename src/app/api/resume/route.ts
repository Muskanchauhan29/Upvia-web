import { NextResponse } from "next/server";

// Simple file-based MongoDB solution (avoids Windows symlink issues)
const DATABASE = "Upvia";
const COLLECTION = "resumes";

interface ResumeDocument {
  _id?: string;
  userId: string;
  fileName: string;
  jobRole: string;
  atsScore: number;
  analysis: any;
  fileContent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---- POST ----
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 API HIT — DATA:", body);

    // Create MongoDB document format
    const resumeDocument: ResumeDocument = {
      _id: new Date().getTime().toString(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to file (ready for MongoDB Compass import)
    const fs = require('fs');
    const path = require('path');
    
    const backupDir = path.join(process.cwd(), 'mongodb-backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const backupData = {
      database: DATABASE,
      collection: COLLECTION,
      documents: [resumeDocument],
      timestamp: new Date().toISOString(),
      connection: "mongodb+srv://muskan:muskan@0509@cluster0.ffxypd2.mongodb.net/",
      importInstructions: {
        step1: "Open MongoDB Compass",
        step2: "Connect to: mongodb+srv://muskan:muskan@0509@cluster0.ffxypd2.mongodb.net/",
        step3: `Navigate to ${DATABASE} -> ${COLLECTION}`,
        step4: "Click 'Import Data' and select this file"
      }
    };

    const backupFile = path.join(backupDir, `${DATABASE}-${COLLECTION}-${Date.now()}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));

    console.log("✅ SAVED ID:", resumeDocument._id);
    console.log("📁 File location:", backupFile);
    console.log("🔗 Connection: mongodb+srv://muskan:muskan@0509@cluster0.ffxypd2.mongodb.net/");
    console.log("📍 Database:", DATABASE);
    console.log("📍 Collection:", COLLECTION);
    console.log("💡 Ready for MongoDB Compass import!");

    return NextResponse.json({
      success: true,
      _id: resumeDocument._id,
      backupFile,
      message: `Saved to ${DATABASE} -> ${COLLECTION} - ready for Compass import`
    });

  } catch (err: any) {
    console.error("❌ SAVE ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
