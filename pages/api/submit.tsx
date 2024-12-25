import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type SheetForm = {
    parentName: string,
    relationship: string,
    parentContact: string,
    parentAddress: string,
    occupation: string,
    annualIncome: string,
    childName: string,
    dob: string,
    gender: string,
    schoolName: string,
    schoolAddress: string,
    grade: string,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ message: "Only POST requests are allowed" });
    }

    const body = req.body as SheetForm;

    try {
        // Google Auth Setup
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n"
                ),
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ],
        });

        const sheets = google.sheets({ auth, version: "v4" });

        // Append data to Google Sheets
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A1:D1", // Target range in your Google Sheet
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        body.parentName,     // Column A: Parent Name
                        body.relationship,   // Column B: Relationship
                        body.parentContact,  // Column C: Parent Contact
                        body.parentAddress,  // Column D: Parent Address
                        body.occupation,     // Column E: Occupation
                        body.annualIncome,   // Column F: Annual Income
                        body.childName,      // Column G: Child Name
                        body.dob,       // Column H: Child Age
                        body.gender,    // Column I: Child Gender
                        body.schoolName,    // Column J: Child School
                        body.schoolAddress,
                        body.grade,
                ],
            ]
        },
     });

        // Success response
        return res.status(200).json({
            data: response.data,
            message: "Data added successfully!",
        });
    } catch (e) {
        const error = e as Error;
        console.error("Error adding data to Google Sheets:", error.message);
        return res
            .status(500)
            .json({ message: error.message ?? "Something went wrong" });
    }
    
}
