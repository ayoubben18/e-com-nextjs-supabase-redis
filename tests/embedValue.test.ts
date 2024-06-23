import { pipeline } from "@xenova/transformers";

describe("Should execurte the embeddings tests", () => {
  it("should convert it to embeddings", async () => {
    const pipe = await pipeline(
      "feature-extraction",
      "Supabase/gte-small",
    );

    // Generate the embedding from text
    const output = await pipe("Hello world", {
      pooling: "mean",
      normalize: true,
    });

    expect(output).toBeDefined();
  });
});
