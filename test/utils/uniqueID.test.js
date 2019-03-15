import UniqueID from "utils/uniqueID";

describe("UniqueID function", () => {
  describe("should create 2 unique ids", () => {
    it("with different strings as inputs", () => {
      const str1 = "string1";
      const str2 = "string2";
      const u1 = UniqueID(str1);
      const u2 = UniqueID(str2);
      expect(u1).not.toEqual(u2);
    });

    it("with same string as inputs", () => {
      const str = "string";
      const u1 = UniqueID(str);
      const u2 = UniqueID(str);
      expect(u1).not.toEqual(u2);
    });

    it("with empty string as inputs", () => {
      const str = "";
      const u1 = UniqueID(str);
      const u2 = UniqueID(str);
      expect(u1).not.toEqual(u2);
    });

    it("without any inputs", () => {
      const u1 = UniqueID();
      const u2 = UniqueID();
      expect(u1).not.toEqual(u2);
    });
  });
});
