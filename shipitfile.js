module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    var wd = '/srv/vhosts/client';

    shipit.initConfig({
        default: {
            workspace: '/tmp/git-monitor',
            deployTo: wd,
            repositoryUrl: 'https://github.com/skukit/client.git',
            ignores: ['.env'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa',
            branch: 'develop'
        },
        staging: {
            servers: 'root@78.155.219.248'
        },
        develop: {
            servers: 'root@78.155.218.193'
        }
    });

    shipit.blTask('removeContainer', function () {
        return shipit.remote("if docker ps -a | grep client ; then docker rm -f client; fi")
    });

    shipit.blTask('buidImage', function () {
        return shipit.remote('cd ' + wd + '/current && docker build -t client .')
    });

    shipit.blTask('installDependencies', function () {
        return shipit.remote('docker run --rm -v ' + wd + '/current:/usr/src/app/ client yarn install');
    });

    shipit.blTask('startContainer', function () {
        return shipit.remote('docker run --name client -e NODE_ENV=production -d -p 8007:3000 -v ' + wd + '/current:/usr/src/app/ client npm start');
    });

    shipit.blTask('restartContainer', function () {
        return shipit.remote('docker restart client');
    });

    shipit.blTask('build', function () {
        return shipit.start('removeContainer', 'buidImage', 'installDependencies', 'startContainer');
    });

    shipit.task('restart', function () {
        return shipit.start('installDependencies', 'restartContainer');
    });
};