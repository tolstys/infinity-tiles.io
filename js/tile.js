class Tile {
    constructor (data = {}) {
        this.name = data.name;
        this.icon = data.icon;
        this.color = data.color;
        this.bgcolor = data.bgcolor;
        this.layer = data.layer;
        this.w = data.w;
        this.h = data.h;
        this.action = data.action;
        this.$elem = $(`<span class="tile color-${this.getColor()} bgcolor-${this.getBgColor()}">${this.getIcon()}<span class="tile-overlay"></span><span class="tile-shadow"></span></span>`);
    }

    updateElem($elem) {
        this.$elem = $elem;
        $(`.game-layer[data-layer="${this.layer.index}"] .tile[data-w=${this.w}][data-h=${this.h}]`).replaceWith(this.getElem());
    }

    getElem() {
        return this.$elem;
    }

    getIcon() {
        return this.icon;
    }

    getColor() {
        return this.color;
    }

    getBgColor() {
        return this.bgcolor;
    }

    getHtml () {
        return this.$elem;
    }

    copy () {
         return new Tile(this);
    }

    equal (tile) {
        return this.icon === tile.icon && this.bgcolor === tile.bgcolor && this.color === tile.color;
    }

    activate () {
        if (this.action !== undefined) {
            this.action.call(this);
            game.moves.push(this);
            this.remove();
            //this.checkEnabled();
        } else {
            game.addTileInRow(this);
        }
    }

    checkEnabled () {
        let l = this.layer.index,
            lu = game.layers[l - 1],
            wd = (lu.getWidth() - this.layer.getWidth()) % 2,
            hd = (lu.getHeight() - this.layer.getHeight()) % 2,
            w1 = parseInt((lu.getWidth() - this.layer.getWidth()) / 2, 10),
            h1 = parseInt((lu.getHeight() - this.layer.getHeight()) / 2, 10);
        //console.log([this.w, this.h], l, wd, hd, w1, h1);
        //console.log(!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null));
        /*
        if (wd === 0 && hd === 0) {
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) return false;
        } else if (wd === 0) {
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) return false;
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1 - 1] === undefined || lu.tiles[this.w + w1][this.h + h1 - 1] === null)) return false;
        } else if (hd === 0) {
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) return false;
            if (!(lu.tiles[this.w + w1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1] === null)) return false;
        } else {
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) return false;
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1 - 1] === undefined || lu.tiles[this.w + w1][this.h + h1 - 1] === null)) return false;
            if (!(lu.tiles[this.w + w1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1] === null)) return false;
            if (!(lu.tiles[this.w + w1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1 - 1] === null)) return false;
        }
        */
        //console.log(lu.tiles[this.w + w1] !== undefined && lu.tiles[this.w + w1][this.h + h1] !== undefined && lu.tiles[this.w + w1][this.h + h1] !== null);
        //console.log(wd !== 0 && hd !== 0 && !(lu.tiles[this.w + w1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1 - 1] === undefined || lu.tiles[this.w + w1 - 1][this.h + h1 - 1] === null));
        if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) return false;
        if (hd !== 0 && !(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1 + hd] === undefined || lu.tiles[this.w + w1][this.h + h1 + hd] === null)) return false;
        if (wd !== 0 && !(lu.tiles[this.w + w1 + wd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1] === null)) return false;
        if (wd !== 0 && hd !== 0 && !(lu.tiles[this.w + w1 + wd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1 + hd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1 + hd] === null)) return false;
        //this.getElem().removeClass("is-disabled");
        this.updateElem(this.getElem().removeClass("is-disabled"));
    }

    remove () {
        $(`.game-layer[data-layer="${this.layer.index}"] .tile[data-w=${this.w}][data-h=${this.h}]`).detach();
        let l = this.layer.index;
        this.layer.tiles[this.w][this.h] = null;
        if (l < game.layers.length - 1) {
            let lu = game.layers[l + 1],
                wd = (lu.getWidth() - this.layer.getWidth()) % 2,
                hd = (lu.getHeight() - this.layer.getHeight()) % 2,
                w1 = parseInt((lu.getWidth() - this.layer.getWidth()) / 2, 10),
                h1 = parseInt((lu.getHeight() - this.layer.getHeight()) / 2, 10);
            //console.log(l, wd, hd, w1, h1);
            //console.log(lu.tiles[this.w + w1][this.h + h1 - 1]);
            if (!(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1] === undefined || lu.tiles[this.w + w1][this.h + h1] === null)) lu.tiles[this.w + w1][this.h + h1].checkEnabled();
            if (hd !== 0 && !(lu.tiles[this.w + w1] === undefined || lu.tiles[this.w + w1][this.h + h1 + hd] === undefined || lu.tiles[this.w + w1][this.h + h1 + hd] === null)) lu.tiles[this.w + w1][this.h + h1 + hd].checkEnabled();
            if (wd !== 0 && !(lu.tiles[this.w + w1 + wd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1] === null)) lu.tiles[this.w + w1 + wd][this.h + h1].checkEnabled();
            if (wd !== 0 && hd !== 0 && !(lu.tiles[this.w + w1 + wd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1 + hd] === undefined || lu.tiles[this.w + w1 + wd][this.h + h1 + hd] === null)) lu.tiles[this.w + w1 + wd][this.h + h1 + hd].checkEnabled();
        }
        if (this.layer.getTilesCount() === 0) {
            this.layer.remove();
            let lastLayer = game.layers[game.layers.length - 1];
            if (lastLayer.count_tile_types < TILES.length) ++ lastLayer.count_tile_types;
            game.addLayer(new Layer({
                count_tile_types: lastLayer.count_tile_types,
                size: [
                    lastLayer.getHeight(), 
                    lastLayer.getWidth()
                ]
            }));
            $(".block-tiles").html(game.getHtml());
        }
    }
}

$(document).on("click", ".block-tiles .tile", function() {
    //game.addTileInRow(getTileByIcon($(this).html()));
    let l = $(this).closest(".game-layer").data("layer"),
    //let l = $(".game-layer").index($(this).closest(".game-layer")),
        w = $(this).data("w"),
        h = $(this).data("h"),
        tile = game.layers[l].tiles[w][h];
    tile.activate();
    $(".block-tiles-row").html(game.getHtmlTilesRow());
    if(!!game.checkRow()) {
        $(".block-tiles-row").html(game.getHtmlTilesRow());
    }
    if (game.tiles_row.length >= game.tiles_row_max) {
        game.end();
    }
    //
    /*
    $(".block-tiles-row").html(game.getHtmlTilesRow());
    //setTimeout(function(){
        if(!!game.checkRow()) {
            $(".block-tiles-row").html(game.getHtmlTilesRow());
        }
    //}, 300);
    //if ($(".block-tiles-row .tile").size() < 6)
    //    $(this).detach().appendTo(".block-tiles-row");
    //$(".block-tiles-row").append($(this).clone());
    //$(this).remove();
    */
});

const TILES_UNIQUE = [
    new Tile({
        icon: '<i class="fa-solid fa-arrow-rotate-left"></i>',
        bgcolor: 'unique',
        action: function() {
            $("#moveBack").prop("disabled", false);
        }
    }),
    new Tile({
        icon: '<i class="fa-regular fa-square-plus"></i>',
        bgcolor: 'unique',
        action: function() {
            game.addTilesRowMax(1);
        }
    }),
    new Tile({
        icon: '<i class="fa-solid fa-shuffle"></i>',
        bgcolor: 'unique',
        action: function() {
            $("#shuffle").prop("disabled", false);
        }
    }),
    new Tile({
        icon: '<i class="fa-solid fa-fire"></i>',
        bgcolor: 'unique',
        action: function() {
            $("#burn").prop("disabled", false);
        }
    }),
    new Tile({
        icon: '<i class="fa-solid fa-clover"></i>',
        bgcolor: 'unique',
        name: "clover"
    })
];

let TILES = [
    new Tile({
        icon: '<i class="fa-solid fa-heart"></i>',
        color: 'red',
        bgcolor: 'red'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-bomb"></i>',
        color: 'black',
        bgcolor: 'red'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-gift"></i>',
        color: 'white',
        bgcolor: 'red'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-tree"></i>',
        color: 'green',
        bgcolor: 'green'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-house"></i>',
        color: 'black',
        bgcolor: 'green'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-poo"></i>',
        color: 'blue',
        bgcolor: 'green'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-star"></i>',
        color: 'yellow',
        bgcolor: 'yellow'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-face-smile"></i>',
        color: 'yellow',
        bgcolor: 'yellow'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-bell"></i>',
        color: 'black',
        bgcolor: 'yellow'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-hippo"></i>',
        color: 'blue',
        bgcolor: 'blue'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-cloud"></i>',
        color: 'white',
        bgcolor: 'blue'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-fish"></i>',
        color: 'black',
        bgcolor: 'blue'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-umbrella"></i>',
        color: 'blue',
        bgcolor: 'purple'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-car-side"></i>',
        color: 'white',
        bgcolor: 'purple'
    }),
    new Tile({
        icon: '<i class="fa-solid fa-ghost"></i>',
        color: 'blue',
        bgcolor: 'purple'
    })
];

function getTileByIcon (icon) {
    return TILES.filter(tile => tile.getIcon() === icon)[0];
}