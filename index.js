import {
  PostPagePhotoMediaRequest,
  PostPublishMediaRequest,
} from "instagram-graph-api";
import RedditImageFetcher from "reddit-image-fetcher";

const at =
  "EAAKM0VsAGS4BALbU6oycNQaRU1QX76VWcEttI8MKfRMdQkbLSbwsiIbuQiU6xvUuXjAtI8JxC4EZBgnRKsGNQeIZCmZCzTh7qVEzuMCZCmZArGSH7wHRfSV43lxxaggYQYP98stFKflkQKaZBTPzKwUAZAM95B1S8mCvPxQwA2kHwZDZD";
const pid = "17841453546894173";
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
