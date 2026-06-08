const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.openById('1o52EmfLqWpHiyQHz4mxzefWOMP9WRHAc3qJr3Gs23-I');
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const data = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.whatsapp || '',
      data.className || '',
      data.subjects || '',
      data.mode || '',
      data.area || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
