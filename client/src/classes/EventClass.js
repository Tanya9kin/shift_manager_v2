import { v4 as uuidv4 } from "uuid";

class Role {
  constructor(category, style) {
    this.category = category;
    this.style = style || null;
  }

  static fromRaw(rawRoleData) {
    return new Role(rawRoleData.category, rawRoleData.style);
  }
}
class PositionToFill {
  constructor(_id = null, title, role, filled_by_id, filled_by_name) {
    this.id = _id;
    this.title = title;
    this.role = role;
    this.filled_by_id = filled_by_id || null;
    this.filled_by_name = filled_by_name || null;
  }

  static fromRaw(rawPositionData) {
    // console.log(`rawPositiontData: ${rawPositionData.title}`);
    const role = Role.fromRaw(rawPositionData.role);
    return new PositionToFill(
      rawPositionData._id,
      rawPositionData.title,
      role,
      rawPositionData.filled_by_id,
      rawPositionData.filled_by_name
    );
  }

  getName() {
    var style = this.getStyle() || "";
    var category = this.getCategory();
    return `${style} ${category}`;
  }

  getStyle() {
    return this.role.style;
  }

  getCategory() {
    return this.role.category;
  }
}

class EventClass {
  constructor(_id = null, title, date, positions) {
    this.id = _id;
    this.title = title;
    this.date = date;
    this.positions = positions || [];
  }

  static fromRaw(rawEventData) {
    // console.log(`rawEventData: ${JSON.stringify(rawEventData)}`);
    const date = new Date(rawEventData.date);
    const positions = rawEventData.positions.map((position) =>
      PositionToFill.fromRaw(position)
    );

    return new EventClass(
      rawEventData._id,
      rawEventData.title,
      date,
      positions
    );
  }

  getPositions() {
    return this.positions;
  }

  positionsFull() {
    return this.positions.every((position) => position.filled_by_id);
  }
}

export { EventClass, PositionToFill, Role };
