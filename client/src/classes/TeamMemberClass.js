import { Role } from "./EventClass";

class TeamMember {
  constructor(
    _id = null,
    first_name,
    last_name,
    roles,
    email,
    phone,
    avatar_url
  ) {
    this.id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.roles = roles;
    this.avatar_url = avatar_url || null;
  }

  static fromRaw(rawTeamMemberData) {
    const roles = rawTeamMemberData.roles.map((role) => Role.fromRaw(role));
    return new TeamMember(
      rawTeamMemberData._id,
      rawTeamMemberData.first_name,
      rawTeamMemberData.last_name,
      roles,
      rawTeamMemberData.email,
      rawTeamMemberData.phone,
      rawTeamMemberData.avatar_url
    );
  }

  getFullName() {
    return this.first_name.concat(" ", this.last_name);
  }
}

export { TeamMember };
