const MAX_TILES_IN_STACK = 6;

const CONFIG = {
    TILE_WIDTH: 60,
    TILE_HEIGHT: 60,
    TILES_ROW_MAX: 6,
    SCORE: 1
};

const SOUNDS = {
    drop: [
        new Audio('./sounds/drop1.mp3'),
        new Audio('./sounds/drop2.mp3'),
        new Audio('./sounds/drop3.mp3'),
        new Audio('./sounds/drop4.mp3'),
        new Audio('./sounds/drop5.mp3'),
        new Audio('./sounds/drop6.mp3')
    ],
    knife: [
        new Audio('./sounds/knife2.mp3'),
        new Audio('./sounds/knife3.mp3'),
        new Audio('./sounds/knife4.mp3'),
        new Audio('./sounds/knife5.mp3')
    ],
    hit: [
        new Audio('./sounds/hit1.mp3'),
        new Audio('./sounds/hit2.mp3'),
        new Audio('./sounds/hit3.mp3'),
        new Audio('./sounds/hit4.mp3'),
        new Audio('./sounds/hit5.mp3')
    ]
};

class Game {
    constructor (data = {}) {
        this.score = 0;
        this.tiles_row = [];
        this.layers = [];
        this.moves = [];
        this.tiles_row_max = CONFIG.TILES_ROW_MAX;
        //this.layers_count = 0;
        this.addTilesRowMax(0);
    }

    getScore () {
        return this.score;
    }

    addScore (value) {
        this.score += value;
        $("#score").text(this.getScore());
    }

    addLayer (layer) {
        //layer.index = this.layers_count ++;
        this.layers.push(layer);
    }

    addTilesRowMax (value) {
        if (this.tiles_row_max + value > CONFIG.TILES_ROW_MAX + 1) return false;
        this.tiles_row_max += value;
        $(".block-tiles-row").height(this.tiles_row_max * 40);
    }

    create() {
        let _this = this;

        this.tiles_unique.map(tile => {
            _this.tiles.push(tile.copy());
        });
        // step 1
        let k = parseInt(this.count_tiles / this.count_tiles_types / 3, 10) * 3;
        //let k = parseInt(this.count_tiles / this.count_tiles_types, 10);
        let tiles = shuffle(TILES.slice()).slice(0, this.count_tiles_types);
        //tiles.map(tile => _this.tiles.push(...Array(k).fill(tile)));
        tiles.map(tile => {
            for (let i = 0; i < k; i ++)
                _this.tiles.push(tile.copy());
        });
        
        // step 2
        let q = parseInt((this.count_tiles + this.tiles_unique.length - this.tiles.length) / 3, 10);
        tiles = shuffle(tiles).slice(0, q);
        //tiles.map(tile => _this.tiles.push(...Array(3).fill(tile)));
        tiles.map(tile => {
            for (let i = 0; i < 3; i ++)
                _this.tiles.push(tile.copy());
        });

        this.tiles = shuffle(this.tiles);
        let arr = this.tiles.slice();

        this.layersData.map((layerData, index) => {
            _this.layers.push(new Layer({
                //width: layerSize[0],
                //height: layerSize[1],
                index: index,
                map: layerData.map,
                tiles: arr.splice(0, layerData.map.reduce((sum, row) => sum + row.reduce((sumR, v) => sumR + v), 0))
            }));
        });
        /*
        let s = 0;
        this.tiles.map(tile => {
            if (_this.tiles_stacks[s] === undefined) _this.tiles_stacks[s] = [];
            _this.tiles_stacks[s].push(tile);
            if (++ s >= _this.count_stacks) s = 0;
        });
        $(".block-tiles").empty();
        this.tiles_stacks.map(stack => {
            let $stack = $('<span class="tiles-stack"></span>');
            stack.map(tile => $stack.append(tile.getHtml()));
            $(".block-tiles").append($stack);
        });
        */
    }

    shuffleTiles () {
        //let _this = this;
        let tiles = [];
        this.layers.map(layer => layer.tiles.map(row => row.map(tile => {
            if (tile !== null) tiles.push(tile.copy());
        })));
        tiles = shuffle(tiles);
        this.layers.map(layer => layer.tiles.map((row, i) => row.map((tile, j) => {
            if (tile !== null) {
                layer.addTile(tiles.pop(), i, j);
            }
        })));
        //console.log(this.layers);
    }
    /*
    checkTileEnabled (l, w, h, w1, h1, $elem = $(`.block-tiles`)) {
        console.log(l, w, h, w1, h1);
        //console.log(l, w, h, w1, h1);
        let $layer = $elem.find(`.game-layer[data-layer="${l + 1}"]`);
        //console.log($layer.find(`.tile[data-w=${w}][data-h=${h}]`).size() > 0);
        //console.log(w1 !== 0, $layer.find(`.tile[data-w=${w - w1}][data-h=${h}]`).size() > 0);
        //console.log(h1 !== 0, $layer.find(`.tile[data-w=${w}][data-h=${h - h1}]`).size() > 0);
        //console.log(w1 !== 0 && h1 !== 0, $layer.find(`.tile[data-w=${w - w1}][data-h=${h - h1}]`).size() > 0);
        if ($layer.find(`.tile[data-w=${w}][data-h=${h}]`).size() > 0) return false;
        if (w1 !== 0 && $layer.find(`.tile[data-w=${w - w1}][data-h=${h}]`).size() > 0) return false;
        if (h1 !== 0 && $layer.find(`.tile[data-w=${w}][data-h=${h - h1}]`).size() > 0) return false;
        if (w1 !== 0 && h1 !== 0 && $layer.find(`.tile[data-w=${w - w1}][data-h=${h - h1}]`).size() > 0) return false;
        $elem.find(`.game-layer[data-layer="${l}"] .tile[data-w=${w}][data-h=${h}]`).removeClass("is-disabled");
    }
    */
    addTileInRow(tile) {
        //let tile = getTileByIcon($(elem).find("i").prop('outerHTML'));
        /*
        let l = $(elem).closest(".game-layer").data("layer"),
            w = $(elem).data("w"),
            h = $(elem).data("h"),
            tile = this.layers[l].tiles[w][h];
        */
        if (this.tiles_row.length >= this.tiles_row_max) return false;
        this.moves.push(tile);
        
        //this.checkTilesEnabled(tile);
        //this.layers[l].removeTile(tile.w, tile.h);
        
        //$(elem).addClass("is-checked");
        let index = this.tiles_row.findLastIndex(elem => elem.equal(tile));
        if (index === -1) index = this.tiles_row.length;
        tile.updateElem(tile.getElem().attr("style", ""));
        this.tiles_row.splice(index, 0, tile);
        game.soundPlay("drop");
        tile.remove();
        return true;
    }
    /*
    checkTilesEnabled (tile) {
        let l = tile.layer.index;
        if (l > 0) {
            let w1d = this.layers[l - 1].getWidth() - this.layers[l].getWidth(),
                h1d = this.layers[l - 1].getHeight() - this.layers[l].getHeight(),
                w1 = Math.sign(w1d),
                h1 = Math.sign(h1d),
                w1c = parseInt(w1d / 2, 10),
                h1c = parseInt(h1d / 2, 10);
            //console.log(w1c, h1c);
            if (w1 === h1 === 0) {
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c, w1, h1);
            } else if (w1 === 0) {
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c, w1, h1);
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c + h1, w1, h1);
            } else if (h1 === 0) {
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c, w1, h1);
                game.checkTileEnabled(l - 1, tile.w + w1c + w1, tile.h + h1c, w1, h1);
            } else {
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c, w1, h1);
                game.checkTileEnabled(l - 1, tile.w + w1c + w1, tile.h + h1c, w1, h1);
                game.checkTileEnabled(l - 1, tile.w + w1c, tile.h + h1c + h1, w1, h1);
                game.checkTileEnabled(l - 1, tile.w + w1c + w1, tile.h + h1c + h1, w1, h1);
            }
        }
    }
    */
    checkRow() {
        let l = this.tiles_row.length;
        if (l < 3) return false;
        /*
        for (let i = 0; i < 2; i ++) {
            if (this.tiles_row[l - 1 - i] !== this.tiles_row[l - 2 - i]) return false;
        }
        */
        let count = 0;
        let count_clover = this.tiles_row.filter(t => t.name === "clover").length;
        for (let i = 1; i < l; i ++) {
            if (this.tiles_row[i].equal(this.tiles_row[i - 1])) {
                ++ count;
            } else {
                count = 0;
            }
            if (count + count_clover >= 2) {
                if (this.tiles_row.length > CONFIG.TILES_ROW_MAX) {
                    this.addTilesRowMax(CONFIG.TILES_ROW_MAX - this.tiles_row.length);
                }
                this.rowBurn(i - 2 + count_clover, 3 - count_clover);
                if (count_clover > 0) {
                    let index = this.tiles_row.findIndex(t => t.name === "clover");
                    this.rowBurn(index, count_clover);
                }
                this.addScore(CONFIG.SCORE);
                return true;
            }
        }
        //this.tiles_row.splice(-3);
        return false;
    }

    rowBurn (from, count) {
        let burned = this.tiles_row.splice(from, count);
        this.moves.push(burned);
        this.soundPlay("drop");
        this.soundPlay("drop");
        this.soundPlay("drop");
    }

    moveBack() {
        if (this.moves.length === 0) return false;
        let move = this.moves.pop();
        if (Array.isArray(move)) {
            this.tiles_row = this.tiles_row.concat(move);
            move = this.moves.pop();
        }
        move.layer.addTile(move.copy(), move.w, move.h);
        let index = this.tiles_row.findLastIndex(elem => elem.equal(move));
        if (index !== -1) this.tiles_row.splice(index, 1); 
    }

    soundPlay(type) {
        let s = SOUNDS[type][getRandomInt(0, SOUNDS[type].length - 1)];
        s.volume = 0.1;
        s.play();
    }

    getHtml() {
        let $gameBlock = $("<div />");
        this.layers.map(layer => $gameBlock.append(layer.getHtml().attr("data-layer", layer.index)/*.css({zIndex: index})*/));
        $gameBlock.find(".game-layer:not(:first-child) .tile").addClass("is-disabled");
        for (let l = 1; l < this.layers.length; l ++) {
            let w1d = this.layers[l].getWidth() - this.layers[l - 1].getWidth(),
                h1d = this.layers[l].getHeight() - this.layers[l - 1].getHeight(),
                w1 = Math.sign(w1d),
                h1 = Math.sign(h1d),
                w1c = parseInt(w1d / 2, 10),
                h1c = parseInt(h1d / 2, 10);
            //console.log([w1d, w1, w1c], [h1d, h1, h1c]);
            for (let w = 0; w < this.layers[l].getWidth(); w ++) {
                for (let h = 0; h < this.layers[l].getHeight(); h ++) {
                    //this.checkTileEnabled(l, w, h, w1c, h1c, $gameBlock);
                    if (this.layers[l].tiles[w] !== undefined && this.layers[l].tiles[w][h] !== undefined && this.layers[l].tiles[w][h] !== null)
                        this.layers[l].tiles[w][h].checkEnabled();
                }
            }
        }
        $(".panel-main").css({
            width: CONFIG.TILE_WIDTH * Math.max(...this.layers.map(layer => layer.getWidth())),
            height: CONFIG.TILE_HEIGHT * Math.max(...this.layers.map(layer => layer.getHeight()))
        });
        return $gameBlock.html();
    }

    getHtmlTilesRow() {
        let html = $("<div />");
        this.tiles_row.map(tile => html.append(tile.getHtml()));
        return html.html();
    }
}

$(document).on("click", "#moveBack", function() {
    if ($(this).hasClass("is-animate")) return false;
    $(this).addClass("is-animate");
    setTimeout(function(){
        $("#moveBack").removeClass("is-animate");
    }, 400);
    game.moveBack();
    $(this).prop("disabled", true);
    $(".block-tiles-row").html(game.getHtmlTilesRow());
    $(".block-tiles").html(game.getHtml());
});

$(document).on("click", "#shuffle", function() {
    game.shuffleTiles();
    $(this).prop("disabled", true);
    $(".block-tiles").html(game.getHtml());
});

$(document).on("click", "#burn", function() {
    game.rowBurn(0, game.tiles_row.length);
    $(this).prop("disabled", true);
    $(".block-tiles-row").html(game.getHtmlTilesRow());
});