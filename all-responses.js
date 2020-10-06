const sheetName = "YOUR_SHEET_NAME";
const groupEmail = "groupmailinglist@email.com";
const emailCol = 1; // Replace with the column number that contains the emails

function addMembersFromSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var emails = sheet.getRange(1, emailCol, sheet.getLastRow(), 1).getValues();
  var group = GroupsApp.getGroupByEmail(groupEmail);

  for (i = 0; i < emails.length; i++) {
    try {
      addMember(emails[i][0], group);
    } catch (e) {
      console.error(e);
      continue;
    }
  }
}

function addMember(email, group) {
  var hasMember = group.hasUser(email);
  Utilities.sleep(300);

  if (!hasMember) {
    var newMember = {
      email: email,
      role: "MEMBER",
      delivery_settings: "NONE",
    };
    AdminDirectory.Members.insert(newMember, groupEmail);
  }
}
