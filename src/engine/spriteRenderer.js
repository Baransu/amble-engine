window.SpriteRenderer = (function() {

  var SpriteRenderer = function SpriteRenderer(args) {

    this.sprite = args.sprite; // || TODO: add placeholder graphics
    this.layer = args.layer || 0;
    this._sprite = null
    this.size = new Vec2();

    this.currentSprite = '';

    this.visible = true;

    this.rendererType = "SpriteRenderer";

    // @ifdef EDITOR
    this.type = "sprite";
    this._editorName = "SpriteRenderer"

    this.arrows = new SceneArrows();

    // @endif
  };

  SpriteRenderer.prototype = {

    render: function render(self, camera) {

      var layer = camera.camera.layer;

      layer.ctx.save();

      if(this._sprite) {
        // console.log(this._sprite.src, this.sprite, AMBLE.loader.isDone())
        if(this.sprite != this.currentSprite && AMBLE.loader.isDone()) {
          this._sprite = AMBLE.loader.getAsset(this.sprite);
          this.currentSprite = this.sprite;
          if(!this._sprite) return;
        }

        var width = this.size.x = this._sprite.width;
        var height = this.size.y = this._sprite.height;
        var x = self.transform.position.x - camera.camera.view.x;
        var y = self.transform.position.y - camera.camera.view.y;

        layer.ctx.translate(x, y);

        if(self.transform.scale.x != 1 || self.transform.scale.y != 1) {
          layer.ctx.scale(self.transform.scale.x, self.transform.scale.y);
        }

        if(self.transform.rotation != 0) {
          layer.ctx.rotate(-self.transform.rotation * Mathf.TO_RADIANS);
        }

        if(this._sprite.src) {

          if(this.visible) {
            layer.ctx.drawImage(this._sprite, -width/2, -height/2);
          }

          // @ifdef EDITOR
          if(self.selected) {

            if(self.transform.scale.x != 1 || self.transform.scale.y != 1) {
              layer.ctx.scale(1/self.transform.scale.x, 1/self.transform.scale.y);
            }

            layer.strokeStyle(primaryColor)
            .lineWidth(1/camera.camera.scale)
            .strokeRect(
              (-width/2)* self.transform.scale.x,
              (-height/2) * self.transform.scale.y,
              width * self.transform.scale.x,
              height * self.transform.scale.y
            );

            if(self.transform.scale.x != 1 || self.transform.scale.y != 1) {
              layer.ctx.scale(self.transform.scale.x, self.transform.scale.y);
            }

            if(self.transform.rotation != 0) {
              layer.ctx.rotate(self.transform.rotation * Mathf.TO_RADIANS);
            }

            if(self.transform.scale.x != 1 || self.transform.scale.y != 1) {
              layer.ctx.scale(1/self.transform.scale.x, 1/self.transform.scale.y);
            }

            this.arrows.render(self, camera);

          }
          // @endif
        }

      } else if(this.sprite != this.currentSprite){
        this._sprite = AMBLE.loader.getAsset(this.sprite);
        this.currentSprite = this.sprite;
      }

      layer.ctx.restore();
    }
  };

  return SpriteRenderer;

}());
