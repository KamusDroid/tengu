import { google } from 'googleapis'

export type OrderRow = [string, string, string, number, string, string]

export async function appendOrderRow(values: OrderRow) {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  )

  const sheets = google.sheets({ version: 'v4', auth })

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID as string

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Pedidos!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  })
}
