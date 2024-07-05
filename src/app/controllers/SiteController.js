class SiteController {
    index(req, res) {
        // [GET] /home;
        res.render('home');
    }
    search(req, res) {
        // [GET] /search
        res.render('search');
    }
}

module.exports = new SiteController();
