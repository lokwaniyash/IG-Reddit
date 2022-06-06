import {
  PostPagePhotoMediaRequest,
  PostPublishMediaRequest,
} from "instagram-graph-api";
import RedditImageFetcher from "reddit-image-fetcher";
import dotenv from "dotenv";
dotenv.config();

const at = process.env.ACCESS_TOKEN;
const pid = process.env.PAGE_ID;
let counter = 0;
setInterval(() => {
  console.clear();
  console.log(`Elapsed — ${counter} / ${3600}`);
  console.log(`Remaining — ${3600 - counter}`);
  if (counter++ == 3600) {
    counter = 0;
    RedditImageFetcher.fetch({
      type: "meme",
      subreddit: ["memes", "dankmemes"],
    }).then((response) => {
      console.log(response[0].image);
      let memeUrl = response[0].image;
      let memeCaption = response[0].title + " — r/" + response[0].subreddit + " — " + response[0].postLink;
      const request = new PostPagePhotoMediaRequest(
        at,
        pid,
        memeUrl,
        memeCaption
      );
      request.execute().then((response) => {
        console.log(response.data.id);
        const igRequest = new PostPublishMediaRequest(
          at,
          pid,
          response.data.id
        );

        igRequest.execute().then((igResponse) => {
          console.log(igResponse);
        });
      });
    });
  }
}, 1000);
