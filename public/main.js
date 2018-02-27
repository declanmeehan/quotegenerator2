/* global $, axios, twttr*/
const button = document.getElementById("quoteGETJSON");
const uri =
  "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
let quoteText = document.getElementById("quoteText");
let quoteHead = document.getElementById("quoteHead");
let response = "";
let twitButton = document.getElementById("twitterContainer");
let quote = "";
//twitter share button
//grabs from the uri and pust it onto the DOM used on click and on load

function quoteFunction() {
  // removes old share button, couldn't find a more dynamic way.
  $("#twitterContainer iframe").remove();
  if (quoteHead.childNodes.length >= 1) {
    quoteHead.removeChild(quoteHead.firstChild);
  }
  if (quoteText.childNodes.length >= 1) {
    quoteText.removeChild(quoteText.firstChild);
  }
  axios
    .get(uri)
    .then(response => {
      let info = response.data;

      function strip(html) {
        let doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
      }
      quoteHead.appendChild(
        quoteHead.ownerDocument.createTextNode(info[0].title)
      );
      let strippedQuoteText = strip(info[0].content);
      quoteText.appendChild(
        quoteText.ownerDocument.createTextNode(strippedQuoteText)
      );
    })
    .then(function(el) {
      //quote to send
      quote = quoteText.textContent + "-" + quoteHead.textContent;
      //share button twitter
      twttr.widgets.load(document.getElementById("twitterContainer"));
      let twitWidget = twttr.widgets.createShareButton("/", twitButton, {
        text: quote
      });
    });
}
//runs on page load
quoteFunction();

