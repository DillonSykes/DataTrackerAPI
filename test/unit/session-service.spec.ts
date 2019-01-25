import "mocha";
import { expect } from "chai";
import { keyName } from "../../src/utils/maps/key-names";
import { SessionService } from "../../src/utils";
const firstName = "Dillon";
const lastName = "Sykes";
const data = "date";
describe("SessionService", () => {
  describe("mapSessionLabels", () => {
    it("should map all fields in flat object", () => {
      const obj = {
        first_name: firstName,
        last_name: lastName,
      };
      const expected = {
        [keyName.first_name]: firstName,
        [keyName.last_name]: lastName,
      };
      const actual = SessionService.mapSessionLabels(obj, keyName, {});
      expect(expected).to.deep.equal(actual);
    });
    it("should map all fields in nested object", () => {
      const obj = {
        client_1: {
          first_name: firstName,
          last_name: lastName,
        },
        children: {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: data,
        },
      };
      const expected = {
        client_1: {
          [keyName.first_name]: firstName,
          [keyName.last_name]: lastName,
        },
        children: {
          [keyName.first_name]: firstName,
          [keyName.last_name]: lastName,
          [keyName.date_of_birth]: data,
        },
      };
      const actual = SessionService.mapSessionLabels(obj, keyName, {});
      expect(expected).to.deep.equal(actual);
    });
    it("should map all fields in nested object with arrays", () => {
      const obj = {
        client_1: {
          first_name: firstName,
          last_name: lastName,
        },
        children: [
          {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: data,
          },
          {
            first_name: firstName,
            last_name: lastName,
          },
        ],
      };
      const expected = {
        client_1: {
          [keyName.first_name]: firstName,
          [keyName.last_name]: lastName,
        },
        children: [
          {
            [keyName.first_name]: firstName,
            [keyName.last_name]: lastName,
            [keyName.date_of_birth]: data,
          },
          {
            [keyName.first_name]: firstName,
            [keyName.last_name]: lastName,
          },
        ],
      };
      const actual = SessionService.mapSessionLabels(obj, keyName, {});
      expect(expected).to.deep.equal(actual);
    });
  });
  describe("mapArrayOfObjectsLabel", () => {
    it("should map object labels in array", () => {
      const obj = [
        {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: data,
        },
        {
          first_name: firstName,
          last_name: lastName,
        },
      ];
      const expected = [
        {
          [keyName.first_name]: firstName,
          [keyName.last_name]: lastName,
          [keyName.date_of_birth]: data,
        },
        {
          [keyName.first_name]: firstName,
          [keyName.last_name]: lastName,
        },
      ];
      const actual = SessionService.mapArrayOfObjectsLabel(obj, keyName, {});
      expect(expected).to.deep.equal(actual);
    });
  });
});
