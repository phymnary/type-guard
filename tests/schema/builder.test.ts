import { expect, test } from "vitest";
import * as g from "@/index";

test("create schema", () => {
  const schema = g.createSchema({
    name: g.string(),
  });
});
