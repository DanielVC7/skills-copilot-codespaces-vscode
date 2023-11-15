function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("member-skills");
    var memberSkillsButton = document.getElementById("member-skills-button");
    var memberSkillsButtonIcon = document.getElementById("member-skills-button-icon");
    if (memberSkills.style.display === "none") {
        memberSkills.style.display = "block";
        memberSkillsButtonIcon.classList.remove("fa-chevron-down");
        memberSkillsButtonIcon.classList.add("fa-chevron-up");
    } else {
        memberSkills.style.display = "none";
        memberSkillsButtonIcon.classList.remove("fa-chevron-up");
        memberSkillsButtonIcon.classList.add("fa-chevron-down");
    }
}