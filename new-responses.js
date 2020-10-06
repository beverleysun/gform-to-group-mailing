const groupEmail = "groupmailinglist@email.com";
const emailFieldName = "email field name";

// Gets the email of the new member when the form is submitted
function onFormSubmit(e) {
  var email = e.namedValues[emailFieldName][0].trim();
  var group = GroupsApp.getGroupByEmail(groupEmail);

  try {
    addMember(email, group);
  } catch (e) {
    console.error(e);
  }
}

// Add the member to the mailing list
function addMember(email, group) {
  var hasMember = group.hasUser(email);

  if (!hasMember) {
    var newMember = { email: email, role: "MEMBER", delivery_settings: "NONE" };
    AdminDirectory.Members.insert(newMember, groupEmail);
  }
}
