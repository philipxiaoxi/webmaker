const snippet = require('./snippet')
const user = require('./user')
const snippetProject = require('./snippetProject')
const forum = require('./forum')
const docker = require('./docker')
const API = {
    // server: 'http://www.xiaotao2333.top:8000/',
    // server: 'https://codeshare.xiaotao2333.top:344/',
    server: 'https://www.xiaotao2333.top:5885/',
    wsServer: 'wss://www.xiaotao2333.top:5885/ws',
    snippet: snippet,
    user: user,
    snippetProject: snippetProject,
    forum: forum,
    docker: docker,
    getServer() {
        return this.server || location.origin
    }
}
module.exports = API
