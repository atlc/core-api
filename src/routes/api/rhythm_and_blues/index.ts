import { Router } from "express";

const router = Router();

const albums = [
    {
        id: 1,
        title: "Blond",
        artist: "Frank Ocean",
        url: "https://www.amazon.com/Blonde-Explicit-Frank-Ocean/dp/B01LYRBECE",
        image: "https://m.media-amazon.com/images/I/71l4jnxG29L._SS500_PIPJStripe-Robin-Large-V2,TopLeft,0,0_.jpg",
        thumbnail_image: "https://m.media-amazon.com/images/I/71l4jnxG29L._SS500_PIPJStripe-Robin-Large-V2,TopLeft,0,0_.jpg",
        _created: "2021-10-28T04:20:10.491Z"
    },
    {
        id: 2,
        title: "Channel Orange",
        artist: "Frank Ocean",
        url: "https://www.amazon.com/Channel-Orange-Explicit-Frank-Ocean/dp/B008KW43TE",
        image: "https://m.media-amazon.com/images/I/51VdVbGAqSL._SS500_PIPJStripe-Robin-Large-V2,TopLeft,0,0_.jpg",
        thumbnail_image: "https://m.media-amazon.com/images/I/51VdVbGAqSL._SS500_PIPJStripe-Robin-Large-V2,TopLeft,0,0_.jpg",
        _created: "2021-10-28T04:20:10.491Z"
    },
    {
        id: 3,
        title: "Nostalgia, ULTRA",
        artist: "Frank Ocean",
        url: "https://www.youtube.com/watch?v=TtdXD2E-03k",
        image: "https://media.pitchfork.com/photos/5929adeb9d034d5c69bf444e/1:1/w_600/084ee64d.jpg",
        thumbnail_image: "https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg",
        _created: "2021-10-28T04:20:10.491Z"
    },
    {
        id: 4,
        title: "Endless",
        artist: "Frank Ocean",
        url: "https://www.youtube.com/watch?v=AHLFNoT64HQ",
        image: "https://www.nme.com/wp-content/uploads/2016/09/CqMWk3kUsAAFOXT-2.jpg",
        thumbnail_image: "https://static.metacritic.com/images/products/music/7/1bebc2ba9859de477ffc2ffa13bd59d4.jpg",
        _created: "2021-10-28T04:20:10.491Z"
    }
];

router.get("/", async (req, res, next) => {
    try {
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
});

router.use("*", (req, res) => res.json({ message: "Sorry, there's nothing else on this hip hop API, just messing with Luke" }));

export default router;
