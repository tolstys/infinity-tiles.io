const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const cors = require('cors');
const TOKEN = "6039106158:AAG_hWeEu2JWM_5Y6CSPDd8ohVBzl9S9vyo";
const server = express();
server.use(cors());
const bot = new TelegramBot(TOKEN, {
    polling: true
});
const port = process.env.PORT || 5000;
const gameName = "infi";
const queries = {};
server.use(express.static(path.join(__dirname, 'tiles')));
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "nyk"));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameurl = "https://tolstys.github.io/infinity-tiles.io/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});
server.get("/score", function (req, res, next) {
    console.log(123);
});
/*
server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options,
        function (err, result) {});
});
*/
server.listen(port, function (){
    console.log("listen", port);
});