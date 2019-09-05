$(document).ready(function() {
    var colBasicWidth = $(".col-body").width() * 0.25;

    function getCurLeft(id) {
        var cur_left = $('#' + id).css('left');
        cur_left = parseInt(cur_left, 10);
        return cur_left;
    }

    function getCurTop(id) {
        var cur_top = $('#' + id).css('top');
        cur_top = parseInt(cur_top, 10);
        return cur_top;
    }

    $('.tab-header').click(function() {
        var id_value = $(this).attr('rel');
        if (!$(this).hasClass('body-expanded')) {
            $('.body-expanded').removeClass('body-expanded');
            $('.revealed').hide();
            $('#' + id_value).fadeIn().addClass('revealed');
            $(this).addClass('body-expanded');
        }
    })

    var model = {
        indirect: {
            vocabulary: [
                { basic: "cleans", variants: ["had cleaned", "cleaned", "cleans", "1"] },
                { basic: "is cleaning", variants: ["had been cleaning", "was cleaning", "is cleaning", "1"] },
                { basic: "has cleaned", variants: ["had cleaned", "had cleaned", "has cleaned", "1"] },
                { basic: "has been cleaning", variants: ["had been cleaning", "had been cleaning", "has been cleaning", "1"] },
                { basic: "cleaned", variants: ["had cleaned", "cleaned", "1", "1"] },
                { basic: "was cleaning", variants: ["had been cleaning", "was cleaning", "1", "1"] },
                { basic: "had cleaned", variants: ["had cleaned", "1", "1", "1"] },
                { basic: "had been cleaning", variants: ["had been cleaning", "1", "1", "1"] },
                { basic: "will clean", variants: ["would have cleaned", "would clean", "1", "will clean"] },
                { basic: "will be cleaning", variants: ["would have been cleaning", "would be cleaning", "1", "will be cleaning"] },
                { basic: "will have cleaned", variants: ["would have cleaned", "would have cleaned", "1", "will have cleaned"] },
                { basic: "will have been cleaning", variants: ["would have been cleaning", "would have been cleaning", "1", "will have been cleaning"] }
            ],

            connecting: function() {
                var connectArray = [
                {links: [this.vocabulary[0].variants[0], this.vocabulary[0].variants[1], this.vocabulary[0].variants[2], this.vocabulary[0].variants[2]], positions: [0, 1, 2, 2]},
                {links: [this.vocabulary[1].variants[0], this.vocabulary[1].variants[1], this.vocabulary[1].variants[2], this.vocabulary[1].variants[2]], positions: [0, 1, 2, 2]},
                {links: [this.vocabulary[2].variants[0], this.vocabulary[2].variants[1], this.vocabulary[2].variants[2], this.vocabulary[2].variants[2]], positions: [0, 1, 2, 2]},
                {links: [this.vocabulary[3].variants[0], this.vocabulary[3].variants[1], this.vocabulary[3].variants[2], this.vocabulary[3].variants[2]], positions: [0, 1, 2, 2]},
                {links: [this.vocabulary[4].variants[0], this.vocabulary[4].variants[0], this.vocabulary[4].variants[1], this.vocabulary[4].variants[1]], positions: [0, 0, 1, 1]},
                {links: [this.vocabulary[5].variants[0], this.vocabulary[5].variants[0], this.vocabulary[5].variants[1], this.vocabulary[5].variants[1]], positions: [0, 0, 1, 1]},
                {links: [this.vocabulary[6].variants[0], this.vocabulary[6].variants[0], this.vocabulary[6].variants[0], this.vocabulary[6].variants[0]], positions: [0, 0, 0, 0]},
                {links: [this.vocabulary[7].variants[0], this.vocabulary[7].variants[0], this.vocabulary[7].variants[0], this.vocabulary[7].variants[0]], positions: [0, 0, 0, 0]},
                {links: [this.vocabulary[8].variants[0], this.vocabulary[8].variants[1], this.vocabulary[8].variants[3], this.vocabulary[8].variants[3]], positions: [0, 1, 3, 3]},
                {links: [this.vocabulary[9].variants[0], this.vocabulary[9].variants[1], this.vocabulary[9].variants[3], this.vocabulary[9].variants[3]], positions: [0, 1, 3, 3]},
                {links: [this.vocabulary[10].variants[0], this.vocabulary[10].variants[1], this.vocabulary[10].variants[3], this.vocabulary[10].variants[3]], positions: [0, 1, 3, 3]},
                {links: [this.vocabulary[11].variants[0], this.vocabulary[11].variants[1], this.vocabulary[11].variants[3], this.vocabulary[11].variants[3]], positions: [0, 1, 3, 3]}
                ];
                return connectArray;
            },

            basics: [
                {data: "0", basic: "cleans", position: 2},
                {data: "1", basic: "is cleaning", position: 2},
                {data: "2", basic: "has cleaned", position: 2},
                {data: "3", basic: "has been cleaning", position: 2},
                {data: "4", basic: "cleaned", position: 1},
                {data: "5", basic: "was cleaning", position: 1},
                {data: "6", basic: "had cleaned", position: 0},
                {data: "7", basic: "had been cleaning", position: 0},
                {data: "8", basic: "will clean", position: 3},
                {data: "9", basic: "will be cleaning", position: 3},
                {data: "10", basic: "will have cleaned", position: 3},
                {data: "11", basic: "will have been cleaning", position: 3}
            ],


            verbCurrent: "cleans",
            
            verb_id: "indirect-col-body-item-2-verb",


            writeVerbCurrent: function() {
                view.changeVerb(this.verb_id, this.verbCurrent);
            },
            getShift: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var position = this.basics[i].position;
                        position = view.position(position);
                        return position;
                    }
                }
            },

            getReplacingVerb: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var word = this.basics[i].basic;
                        this.verbCurrent = word;
                        return word;
                    }
                }
            },

            getCurrentArray: function() {
                    for (var i = 0; i < this.vocabulary.length; i++) {
                        if (this.vocabulary[i].basic === this.verbCurrent) {
                            var indexCur = i;
                        }
                    }
                    return indexCur;
            },

            getRightFormVerb: function(sayPosition) {
                    var indexCur = this.getCurrentArray();
                    
                    var connectArray = this.connecting();
                    var replacingVerb = connectArray[indexCur].links[sayPosition];
                    return replacingVerb;       
            },

            getRightFormPosition: function(sayPosition) {
                    var indexCur = this.getCurrentArray();
                    
                    var connectArray = this.connecting();
                    var newPosition = connectArray[indexCur].positions[sayPosition];
                    return newPosition;       
            }


        },

        conditional: {
            vocabulary: [
                { basic: "if he <span class='bold'>goes</span> to the shop,<br> he <span class='bold'>will buy</span> that toy", variants: ["if he <span class='bold'>had gone</span> to the shop,<br> he <span class='bold'>would have bought</span> that toy", "if he <span class='bold'>went</span> to the shop,<br> he <span class='bold'>would buy</span> that toy", "if he <span class='bold'>goes</span> to the shop,<br> he <span class='bold'>will buy</span> that toy", "1"] },
                { basic: "if he <span class='bold'>went</span> to the shop,<br> he <span class='bold'>would buy</span> that toy", variants: ["1", "1", "if he <span class='bold'>went</span> to the shop,<br> he <span class='bold'>would buy</span> that toy", "1"] },
                { basic: "if he <span class='bold'>had gone</span> to the shop,<br> he <span class='bold'>would have bought</span> that toy", variants: ["1", "if he <span class='bold'>had gone</span> to the shop,<br> he <span class='bold'>would have bought</span> that toy", "1", "1"] },
                { basic: "if he <span class='bold'>had gone</span> to the shop 2 days ago,<br> he <span class='bold'>would possess</span> that toy now", variants: ["1", "1", "if he <span class='bold'>had gone</span> to the shop 2 days ago,<br> he <span class='bold'>would possess</span> that toy now", "1"] },
                { basic: "if he <span class='bold'>knew</span> English,<br> he <span class='bold'>would have talked</span> to that girl 2 days ago", variants: ["1", "if he <span class='bold'>knew</span> English,<br> he <span class='bold'>would have talked</span> to that girl 2 days ago", "1", "1"] }
            ],

            connecting: function() {
                var connectArray = [
                {links: [this.vocabulary[0].variants[0], this.vocabulary[0].variants[1], this.vocabulary[0].variants[2], this.vocabulary[0].variants[2]], positions: [0, 1, 2, 2]},
                {links: [this.vocabulary[1].variants[2], this.vocabulary[1].variants[2], this.vocabulary[1].variants[2], this.vocabulary[1].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[2].variants[1], this.vocabulary[2].variants[1], this.vocabulary[2].variants[1], this.vocabulary[2].variants[1]], positions: [1, 1, 1, 1]},
                {links: [this.vocabulary[3].variants[2], this.vocabulary[3].variants[2], this.vocabulary[3].variants[2], this.vocabulary[3].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[4].variants[1], this.vocabulary[4].variants[1], this.vocabulary[4].variants[1], this.vocabulary[4].variants[1]], positions: [1, 1, 1, 1]}
                ];
                return connectArray;
            },

            basics: [
                {data: "0", basic: "if he <span class='bold'>goes</span> to the shop,<br> he <span class='bold'>will buy</span> that toy", position: 2},
                {data: "1", basic: "if he <span class='bold'>went</span> to the shop,<br> he <span class='bold'>would buy</span> that toy", position: 2},
                {data: "2", basic: "if he <span class='bold'>had gone</span> to the shop,<br> he <span class='bold'>would have bought</span> that toy", position: 1},
                {data: "3", basic: "if he <span class='bold'>had gone</span> to the shop 2 days ago,<br> he <span class='bold'>would possess</span> that toy now", position: 2},
                {data: "4", basic: "if he <span class='bold'>knew</span> English,<br> he <span class='bold'>would have talked</span> to that girl 2 days ago", position: 1}
            ],


            verbCurrent: "if he <span class='bold'>goes</span> to the shop,<br> he <span class='bold'>will buy</span> that toy",
            
            verb_id: "indirect-col-body-item-4-verb",


            writeVerbCurrent: function() {
                view.changeVerb(this.verb_id, this.verbCurrent);
            },
            getShift: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var position = this.basics[i].position;
                        position = view.position(position);
                        return position;
                    }
                }
            },

            getReplacingVerb: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var word = this.basics[i].basic;
                        this.verbCurrent = word;
                        return word;
                    }
                }
            },

            getCurrentArray: function() {
                    for (var i = 0; i < this.vocabulary.length; i++) {
                        if (this.vocabulary[i].basic === this.verbCurrent) {
                            var indexCur = i;
                        }
                    }
                    return indexCur;
            },

            getRightFormVerb: function(sayPosition) {
                    var indexCur = this.getCurrentArray();                    
                    var connectArray = this.connecting();
                    var replacingVerb = connectArray[indexCur].links[sayPosition];
                    return replacingVerb;       
            },

            getRightFormPosition: function(sayPosition) {
                    var indexCur = this.getCurrentArray();
                    
                    var connectArray = this.connecting();
                    var newPosition = connectArray[indexCur].positions[sayPosition];
                    return newPosition;       
            }


        },

        subjunctive: {
            vocabulary: [
                { basic: "you <span class='bold'>would come</span> soon", variants: ["1", "1", "you <span class='bold'>would come</span> soon", "1"] },
                { basic: "you <span class='bold'>were</span> close to me", variants: ["1", "1", "you <span class='bold'>were</span> close to me", "1"] },
                { basic: "you <span class='bold'>had gone</span> there with me", variants: ["1", "you <span class='bold'>had gone</span> there with me", "1", "1"] },
                { basic: "that he <span class='bold'>start</span> working", variants: ["1", "1", "that he <span class='bold'>start</span> working", "1"] },
                { basic: "that he <span class='bold'>should start</span> working", variants: ["1", "1", "that he <span class='bold'>should start</span> working", "1"] },
                { basic: "that you <span class='bold'>should have gone</span> there with me", variants: ["1", "that you <span class='bold'>should have gone</span> there with me", "1", "1"] }
            ],

            connecting: function() {
                var connectArray = [
                {links: [this.vocabulary[0].variants[2], this.vocabulary[0].variants[2], this.vocabulary[0].variants[2], this.vocabulary[0].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[1].variants[2], this.vocabulary[1].variants[2], this.vocabulary[1].variants[2], this.vocabulary[1].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[2].variants[1], this.vocabulary[2].variants[1], this.vocabulary[2].variants[1], this.vocabulary[2].variants[1]], positions: [1, 1, 1, 1]},
                {links: [this.vocabulary[3].variants[2], this.vocabulary[3].variants[2], this.vocabulary[3].variants[2], this.vocabulary[3].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[4].variants[2], this.vocabulary[4].variants[2], this.vocabulary[4].variants[2], this.vocabulary[4].variants[2]], positions: [2, 2, 2, 2]},
                {links: [this.vocabulary[5].variants[1], this.vocabulary[5].variants[1], this.vocabulary[5].variants[1], this.vocabulary[5].variants[1]], positions: [1, 1, 1, 1]}
                ];
                return connectArray;
            },

            basics: [
                {data: "0", basic: "you <span class='bold'>would come</span> soon", position: 2, sayBasic: "I <span class='bold'>wish</span>", sayPosition: 2},
                {data: "1", basic: "you <span class='bold'>were</span> close to me", position: 2, sayBasic: "I <span class='bold'>wish</span>", sayPosition: 2},
                {data: "2", basic: "you <span class='bold'>had gone</span> there with me", position: 1, sayBasic: "I <span class='bold'>wish</span>", sayPosition: 2},
                {data: "3", basic: "that he <span class='bold'>start</span> working", position: 2, sayBasic: "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", sayPosition: 2},
                {data: "4", basic: "that he <span class='bold'>should start</span> working", position: 2, sayBasic: "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", sayPosition: 2},
                {data: "5", basic: "that you <span class='bold'>should have gone</span> there with me", position: 1, sayBasic: "It <span class='bold'>is</span> desirable", sayPosition: 2}
            ],


            verbCurrent: "you <span class='bold'>would come</span> soon",
            
            verb_id: "indirect-col-body-item-6-verb",

            sayCurrent: "I <span class='bold'>wish</span>",


            writeVerbCurrent: function() {
                view.changeVerb(this.verb_id, this.verbCurrent);
            },
            getShift: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var position = this.basics[i].position;
                        position = view.position(position);
                        return position;
                    }
                }
            },

            getReplacingVerb: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var word = this.basics[i].basic;
                        this.verbCurrent = word;
                        return word;
                    }
                }
            },

            getReplacingSay: function(data) {
                for (var i = 0; i < this.basics.length; i++) {
                    if (this.basics[i].data === data) {
                        var word = this.basics[i].sayBasic;
                        this.sayCurrent = word;
                        return word;
                    }
                }
            },

            getCurrentArray: function(vocabulary, current) {
                    for (var i = 0; i < vocabulary.length; i++) {
                        if (vocabulary[i].basic === current) {
                            var indexCur = i;
                        }
                    }
                    return indexCur;
            },

            getRightFormVerb: function(sayPosition) {
                    var indexCur = this.getCurrentArray(this.vocabulary, this.verbCurrent);                    
                    var connectArray = this.connecting();
                    var replacingVerb = connectArray[indexCur].links[sayPosition];
                    return replacingVerb;       
            },

            getRightFormPosition: function(sayPosition) {
                    var indexCur = this.getCurrentArray(this.vocabulary, this.verbCurrent);
                    
                    var connectArray = this.connecting();
                    var newPosition = connectArray[indexCur].positions[sayPosition];
                    return newPosition;       
            },

            vocabularySay: [
                { basic: "I <span class='bold'>wish</span>", variants: ["I <span class='bold'>had wished</span>", "I <span class='bold'>wished</span>", "I <span class='bold'>wish</span>", "I <span class='bold'>will wish</span>"] },
                { basic: "I <span class='bold'>wish</span>", variants: ["I <span class='bold'>had wished</span>", "I <span class='bold'>wished</span>", "I <span class='bold'>wish</span>", "I <span class='bold'>will wish</span>"] },
                { basic: "I <span class='bold'>wish</span>", variants: ["I <span class='bold'>had wished</span>", "I <span class='bold'>wished</span>", "I <span class='bold'>wish</span>", "I <span class='bold'>will wish</span>"] },
                { basic: "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", variants: ["I <span class='bold'>had demanded</span><br> (it <span class='bold'>had been demanded</span>)", "I <span class='bold'>demanded</span><br> (it <span class='bold'>was demanded</span>)", "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", "I <span class='bold'>will demand</span><br> (it <span class='bold'>will be demanded</span>)"] },
                { basic: "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", variants: ["I <span class='bold'>had demanded</span><br> (it <span class='bold'>had been demanded</span>)", "I <span class='bold'>demanded</span><br> (it <span class='bold'>was demanded</span>)", "I <span class='bold'>demand</span><br> (it <span class='bold'>is demanded</span>)", "I <span class='bold'>will demand</span><br> (it <span class='bold'>will be demanded</span>)"] },
                { basic: "It <span class='bold'>is</span> desirable", variants: ["It <span class='bold'>had been</span> desirable", "It <span class='bold'>was</span> desirable", "It <span class='bold'>is</span> desirable", "It <span class='bold'>will be</span> desirable"] }
            ],
        
            getRightFormSay: function(position) {
                var indexCur = this.getCurrentArray(this.vocabularySay, this.sayCurrent);
                var replacingVerb = this.vocabularySay[indexCur].variants[position];
                return replacingVerb;
            }
        },

        vocabularySay: ["He <span class='bold'>had said</span>", "He <span class='bold'>said</span>", "He <span class='bold'>says</span>", "He <span class='bold'>will say</span>"],
        
        getRightFormSay: function(position) {
            var replacingVerb = this.vocabularySay[position];
            return replacingVerb;
        }
    }

    var view = {
        position: function(digit) {
                var left = (colBasicWidth) * digit;
                return left;
        },
        popup: function(element, verb_id, folder) {
            $(element).fadeIn('slow');
            $('.popup-wrapper').fadeIn('slow');

            $('.close-mark').click(function(){
                $(this).parent().fadeOut();
                $('.popup-wrapper').fadeOut();
            })

            $(".popup-div").click(function() {
                $(element + " .active").removeClass('active');
                $(this).addClass('active');
                                
                $(element).fadeOut();
                $('.popup-wrapper').fadeOut();

                var data = $(this).attr("data");

                if (folder == 2) {
                    var verb = model.indirect.getReplacingVerb(data);
                    var left = model.indirect.getShift(data);
                    var draggableId = "indirect-col-body-item-1";
                }

                else if (folder == 4) {
                    var verb = model.conditional.getReplacingVerb(data);
                    var left = model.conditional.getShift(data); 
                    var draggableId = "indirect-col-body-item-3";                   
                }

                else if (folder == 6) {
                    var verb = model.subjunctive.getReplacingVerb(data);
                    var left = model.subjunctive.getShift(data); 
                    var draggableId = "indirect-col-body-item-5";                   
                }

                var basicVerbId = "indirect-current-item-" + folder + "-verb";
                var basicVerb = $(this).html();

                view.changeVerb(basicVerbId, basicVerb);
                
                view.changeVerb(verb_id, verb);
                
                 view.move($("#" + verb_id).parent().attr("id"), left);
                 view.move(draggableId, view.position(2));
                 if (folder == 6) {
                    var sayWordWish = model.subjunctive.getReplacingSay(data);
                    view.changeVerb($("#" + draggableId + " .replacable").attr("id"), sayWordWish);
                    }
                else {                    
                 view.changeVerb($("#" + draggableId + " .replacable").attr("id"), "He <span class='bold'>says</span>");                    
                }
            })
        },
        changeVerb: function(verb_id, verb) {
            $("#" + verb_id).html(verb);
        },
        move: function(id, left) {
                var px_left = left + "px";
                $('#' + id).animate({ left: px_left }, 'slow');                
        },
        dragMove: function(block, cur_left, move_also, folder) {

                var sayPosition = Math.ceil(cur_left / (colBasicWidth));

                

                var verb_also_id = $("#" + move_also + " .replacable").attr("id");

                if (folder == 1) {
                    var replacingVerbAlso = model.indirect.getRightFormVerb(sayPosition);
                    var newPosition = model.indirect.getRightFormPosition(sayPosition);
                    var left = this.position(newPosition);
                    var replacingVerb = model.getRightFormSay(sayPosition);
                } 

                else if (folder == 3) {
                    var replacingVerbAlso = model.conditional.getRightFormVerb(sayPosition);
                    var newPosition = model.conditional.getRightFormPosition(sayPosition);
                    var left = this.position(newPosition);
                    var replacingVerb = model.getRightFormSay(sayPosition);
                } 

                else if (folder == 5) {
                    var replacingVerbAlso = model.subjunctive.getRightFormVerb(sayPosition);
                    var newPosition = model.subjunctive.getRightFormPosition(sayPosition);
                    var left = this.position(newPosition);
                    var replacingVerb = model.subjunctive.getRightFormSay(sayPosition);
                }
                var verb_id = $("#" + block + " .replacable").attr("id");              
                
                this.changeVerb(verb_id, replacingVerb);
                this.changeVerb(verb_also_id, replacingVerbAlso);
                view.move(move_also, left);                    
                
        }
    }


    $('.draggable').draggable({
    	axis: "x", 
    	grid: [(colBasicWidth), (colBasicWidth)],
    	cursor: "move",
        containment: "parent",
        scroll: false,
        start: function() {},
    	stop: function() {    		
            var sayBlockId = $(this).attr("id"); 
            var verbBlockId = $(this).next().attr("id");
            var currentPositionDrag = getCurLeft(sayBlockId);
            var folder = sayBlockId.charAt(sayBlockId.length - 1);
    		view.dragMove(sayBlockId, currentPositionDrag, verbBlockId, folder);
    	}
    });
    $(".popup-activator").click(function() {
        var id_popup = $(this).attr("rel");
        var popup = "#" + id_popup;
        var activatorId = $(this).attr("id");
        var id_number = activatorId.charAt(activatorId.length - 1);
        var id_verb = "indirect-col-body-item-" + id_number + "-verb";
        view.popup(popup, id_verb, id_number);
    })



    $('.col-body-item').css("max-width", (colBasicWidth - 60));
    model.indirect.writeVerbCurrent();
    model.conditional.writeVerbCurrent();
    model.subjunctive.writeVerbCurrent();


})