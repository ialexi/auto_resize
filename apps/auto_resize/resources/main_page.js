// ==========================================================================
// Project:   AutoResize - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals AutoResize */

// This page describes the main user interface for your application.  
AutoResize.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'toolbar'.w(),
    toolbar: SC.ToolbarView.design({
      childViews: "textfield button".w(),
      textfield: SC.TextFieldView.design({
        layout: { left: 10, width: 100, height: 24, centerY: 0 },
        valueBinding: "AutoResize.appController.text",
        
        autoResize: function() {
          // get the layer
          var layer = this.get("layer");
          
          // return if there wasn't one (no font sizes, etc. to use with measuring)
          if (!layer) return;
          
          // get metrics, using layer as example element
          var metrics = SC.metricsForString(this.get("value"), layer);
          
          // 10 is an arbitrary value to give a little padding.
          this.adjust("width", metrics.width + 10);
        },
        
        // we need to update the measurement when the value changes
        valueDidChange: function(){ 
          sc_super(); // just in case
          this.autoResize();
        }.observes("value"),
        
        // also, need to update when the layer is created
        // note: not so much need to update when the layer is updated; 
        // we could then end up changing the size due to the layer being updated, causing another layer update;
        // which would not be great for performance.
        didCreateLayer: function(){
          sc_super(); // just in case
          this.autoResize();
        }
      }),
      button: SC.ButtonView.design({
        layout: { right: 10, width: 100, height: 24, centerY: 0 },
        titleBinding: "AutoResize.appController.text",
        
        autoResize: function() {
          // get the layer
          var layer = this.get("layer");
          
          // return if there wasn't one (no font sizes, etc. to use with measuring)
          if (!layer) return;
          
          // get metrics, using layer as example
          var metrics = SC.metricsForString(this.get("title"), layer);
          
          // 16 gives a nice amount of space on either side of the text; titleMinWidth is a property
          // of ButtonView that in essence gives the button a minimum width.
          this.adjust("width", Math.max(metrics.width, this.get("titleMinWidth")) + 16);
        },
        
        titleDidChange: function(){ 
          sc_super(); // just in case
          this.autoResize();
        }.observes("title"),
        
        didCreateLayer: function(){
          sc_super(); // just in case
          this.autoResize();
        }
      })
    })
  })

});
