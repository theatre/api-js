(function($){

    // liste des spectacles
    $.fn.thnetSpectacles = function(options){

        // div de destination
        var destDiv = this.selector;

        // paramètres et options
        var options = $.extend({
            apiRequest: '/api/',
            from: null, // date de début de recherche
            to: null, // date de fin de recherche
            start: null, // début de recherche
            end: null, // fin de recherche
            apiKey: null, // clé API
            entryPoint: 'http://www.theatre-contemporain.net', // point d'entrée
            jsonFormater: null
        },options);

        // récupèrer le JSON
        $.getJSON(options.entryPoint + options.apiRequest + '?callback=?',{
                k: options.apiKey, // clé d'authentification
                from: options.from, // date de début de période
                to: options.to, // date de fin de période
                start: options.start, // date de début de période
                end: options.end // date de fin de période
            }, function(data){

                // DEBUG si il y a un "formater" json, on l'utilise
                if(options.jsonFormater) {
                    $('#debug-json').html(FormatJSON(data));
                }

                var items = [];

                // parcourir les résultats
                $.each(data, function(key, val) {

                    // image et titre du spectacle
                    var spectacle = '<img src="' + val.poster + '" alt="" style="vertical-align: middle" class="thnet-poster" /> ';
                    spectacle += '<span class="thnet-titre">' + val.title + '</span>';
                    spectacle += '<ul>';

                    // voir s'il y a des acteurs
                    if(val.hasOwnProperty('actors')) {
                        var actors = '<li><span class="thnet-section">Acteurs</span><ul>';
                        // parcourir les acteurs
                        $.each(val.actors, function(idactor, actor) {
                            actors += '<li class="thnet-actors">' + actor.firstname + ' ' + actor.lastname + '</li>';
                        });
                        actors += '</ul></li>';
                        spectacle += actors;
                    }

                    // parcourir la distribution
                    if(val.hasOwnProperty('distributions')) {
                        var distributions = '<li><span class="thnet-section">Distributions</span><ul>';
                        // parcourir la distribution
                        $.each(val.distributions, function(idperson, person) {
                            distributions += '<li class="thnet-actors">' + person.firstname + ' ' + person.lastname;
                            // les roles
                            if(person.hasOwnProperty('roles')) {
                                var roles = [];
                                $.each(person.roles, function(idrole, role) {
                                    roles.push(role);
                                });
                                distributions +=  '&nbsp;<span class="thnet-roles">' + roles.join(', ') + '</span>';
                            }
                            distributions += '</li>';
                        });
                        distributions += '</ul></li>';
                        // ajout à spectacle
                        spectacle += distributions;

                    }

                    spectacle += '</ul>';
                    items.push('<li id="thnet-' + key + '">' + spectacle + '</li>');

                });
            $('<ul/>', {'class': 'thnet-spectacles', html: items.join('')}).appendTo(destDiv);
        });
    };

    // liste des vidéos
    $.fn.thnetVideos = function(options){

        // div de destination
        var destDiv = this.selector;

        // paramètres et options
        var options = $.extend({
            apiRequest: '/api/',
            start: null, // début de recherche
            end: null, // fin de recherche
            apiKey: null, // clé API
            entryPoint: 'http://www.theatre-video.net', // point d'entrée
            jsonFormater: null
        },options);

        // récupèrer le JSON
        $.getJSON(options.entryPoint + options.apiRequest + '?callback=?',{
                k: options.apiKey, // clé d'authentification
                start: options.start, // date de début de période
                end: options.end // date de fin de période
            }, function(data){

                // DEBUG si il y a un "formater" json, on l'utilise
                if(options.jsonFormater) {
                    $('#debug-json').html(FormatJSON(data));
                }

                var items = [];

                // parcourir les résultats
                $.each(data, function(key, val) {

                    // image et titre du video
                    var video = '<img src="' + val.thumbnail + '" alt="" style="vertical-align: middle" class="thnet-poster" /> ';
                    video += '<span class="thnet-titre">' + val.title + '</span>';
                    video += '<ul>';
                    
                    video += '</ul>';
                    items.push('<li id="thnet-' + key + '">' + video + '</li>');

                });
            $('<ul/>', {'class': 'thnet-videos', html: items.join('')}).appendTo(destDiv);
        });
    };

})(jQuery)
