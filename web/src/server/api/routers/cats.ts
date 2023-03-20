import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/utils/db";

export const catsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const cats = await db
      .selectFrom("cats")
      .select(["id", "name", "bio", "imgUrl", "birthDate", "gender"])
      .where("isDeleted", "=", false)
      .execute();

    return {
      cats,
    };
  }),

  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthDate: z.date(),
        gender: z.enum(["F", "M"]),
        bio: z.string().default(""),
        imgUrl: z.string().default(""),
      })
    )
    .query(async ({ input }) => {
      const { name, birthDate, gender, bio, imgUrl } = input;

      await db
        .insertInto("cats")
        .values({
          name,
          birthDate,
          gender,
          bio,
          imgUrl,
        })
        .execute();

      return {
        ok: true,
      };
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      await db.deleteFrom("cats").where("id", "=", id).execute();

      return {
        ok: true,
      };
    }),
});
