var Scene = (function() {

  var Scene = function Scene() {
    this.children = [];
    this.started = false;
    // @ifdef EDITOR
    this.shortArray = [];
    // @endif
  };

  Scene.prototype = {

    // @ifdef EDITOR
    createSceneFile: function createSceneFile(){

      var data = [];
      for(var i = 1; i < this.children.length; i++) {
        this.children[i].prefab.name = this.children[i].name;
        console.log(this.children[i].name)
        data.push(this.children[i].prefab);
      }

      // TODO: cleaning up objects

      return data;
    },
    // @endif

    getActorByName: function getActorByName(name) {
      return this.children.find(function(c) {return c.name == name })
    },

    getActorByID: function getActorByID(id) {
      return this.children.find(function(c) { return c.sceneID == id });
    },

    instantiate: function instantiate(obj) {
      var actor = new Actor();
      var clone = Utils.clone(obj);
      for(var i in clone) {
        actor[i] = clone[i];
      }

      actor.prefab = obj;

      // console.log(actor);
      return this._add(actor);
    },

    _add: function _add(object) {

      var sceneID = Utils.generateID();
      object.sceneID = sceneID;

      if(object.components !== undefined) {
        for(var i = 0; i < object.components.length; i++) {
          var _component = object.components[i].body;
          if(typeof _component.awake == 'function'){
            _component.awake(object);
          }
        }
      }

      if(this.started && object.components !== undefined) {
        for(var i = 0; i < object.components.length; i++) {
          var _component = object.components[i].body;
          if(typeof _component.start == 'function'){
            _component.start(object);
          }
        }
      }

      this.children.push(object);

      this.sort();

      // @ifdef EDITOR
      this.shortArray.push({
        name: object.name,
        sceneID: sceneID,
        selected: false
      });
      // @endif

      return object;
    },

    //sort by layer
    sort: function sort() {
      this.children.sort(function(a, b) {
        if(!a.renderer || !b.renderer) {
          return 0;
        } else {
          return a.renderer.layer - b.renderer.layer;
        }
      });
    },

    remove: function remove(object) {
      var index = this.children.indexOf(object);
      if(index != -1) {
        this.children.splice(index, 1);
      }
    },

    start: function start() {
        for(var i = 0; i < this.children.length; i++) {
        for(var j = 0; j < this.children[i].components.length; j++) {
          var _component = this.children[i].components[j].body;
          if(typeof _component.start == 'function'){
            _component.start(this.children[i]);
          }
        }
      }
      this.started = true;
    },

    update: function update() {
      for(var i = 0; i < this.children.length; i++) {
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.update == 'function'){
            _component.update(this.children[i]);
          }
        }
      }
    },

    render: function render(camera) {
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i].renderer && typeof this.children[i].renderer.render === 'function') {
          this.children[i].renderer.render(this.children[i], camera)
        }
      }
    },

    onmousewheel: function onmousewheel(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onmousewheel == 'function'){
            _component.onmousewheel(this.children[i], e);
          }
        }
      }
    },

    onmousedown: function onmousedown(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onmousedown == 'function'){
            _component.onmousedown(this.children[i], e);
          }
        }
      }
    },

    onmousemove: function onmousemove(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onmousemove == 'function'){
            _component.onmousemove(this.children[i], e);
          }
        }
      }
    },

    onmouseup: function onmouseup(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onmouseup == 'function'){
            _component.onmouseup(this.children[i], e);
          }
        }
      }
    },

    onkeydown: function onkeydown(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onkeydown == 'function'){
            _component.onkeydown(this.children[i], e);
          }
        }
      }
    },

    onkeyup: function onkeyup(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.onkeyup == 'function'){
            _component.onkeyup(this.children[i], e);
          }
        }
      }
    },

    oncontextmenu: function oncontextmenu(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.oncontextmenu == 'function'){
            _component.oncontextmenu(this.children[i], e);
          }
        }
      }
    },

    ontouchstart: function ontouchstart(e) {
      for(var i = 0; i < this.children.length; i++) {
        for(var j = 0; j < this.children[i].components.length; j++) {
          var _component = this.children[i].components[j].body;
          if(typeof _component.ontouchstart == 'function'){
            _component.ontouchstart(this.children[i], e);
          }
        }
      }
    },

    ontouchend: function ontouchend(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.ontouchend == 'function'){
            _component.ontouchend(this.children[i], e);
          }
        }
      }
    },

    ontouchmove: function ontouchmove(e) {
      for(var i = 0; i < this.children.length; i++){
        for(var j = 0; j < this.children[i].components.length; j++){
          var _component = this.children[i].components[j].body;
          if(typeof _component.ontouchmove == 'function'){
            _component.ontouchmove(this.children[i], e);
          }
        }
      }
    }

  };

  return Scene;

}());