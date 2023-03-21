import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/utils/db";

export const catsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const cats = await db
      .selectFrom("cats")
      .select(["id", "name", "bio", "imgUrl", "birthdate", "gender"])
      .where("isDeleted", "=", false)
      .orderBy("name", "asc")
      .execute();

    return {
      cats,
    };
  }),

  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        birthdate: z.string(), // date string
        gender: z.enum(["F", "M"]),
        bio: z.string(),
        imgUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, birthdate, gender, bio, imgUrl } = input;

      await db
        .insertInto("cats")
        .values({
          name,
          birthdate,
          gender,
          bio,
          imgUrl,
        })
        .execute();

      return {
        ok: true,
      };
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        birthdate: z.string(), // date string
        gender: z.enum(["F", "M"]),
        bio: z.string(),
        imgUrl: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, birthdate, gender, bio, imgUrl } = input;

      await db
        .updateTable("cats")
        .set({
          name,
          birthdate,
          gender,
          bio,
          imgUrl,
        })
        .where("id", "=", id)
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

      // alternatively, we could set isDeleted to true
      await db.deleteFrom("cats").where("id", "=", id).execute();

      return {
        ok: true,
      };
    }),
});
