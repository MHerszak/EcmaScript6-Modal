/**
 * Created by michelherszak on 20/09/15.
 */

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modales6 = (function () {
    function Modales6() {
        _classCallCheck(this, Modales6);

        // Create global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;

        // Determine proper prefix
        this.transitionEnd = this.transitionSelect();

        // Define option defaults
        var defaults = {
            autoOpen: false,
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        };

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = this.extendDefaults(defaults, arguments[0]);
        }

        if (this.options.autoOpen === true) this.open();
    }

    _createClass(Modales6, [{
        key: "close",
        value: function close() {
            var _ = this;
            this.modal.className = this.modal.className.replace(" base2-open", "");
            this.overlay.className = this.overlay.className.replace(" base2-open", "");
            this.modal.addEventListener(this.transitionEnd, function () {
                _.modal.parentNode.removeChild(_.modal);
            });
            this.overlay.addEventListener(this.transitionEnd, function () {
                if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.buildOut.call(this);
            this.initializeEvents.call(this);
            window.getComputedStyle(this.modal).height;
            this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " base2-open base2-anchored" : " base2-open");
            this.overlay.className = this.overlay.className + " base2-open";
        }
    }, {
        key: "transitionSelect",
        value: function transitionSelect() {
            var el = document.createElement("div");
            if (el.style.WebkitTransition) return "webkitTransitionEnd";
            if (el.style.OTransition) return "oTransitionEnd";
            return 'transitionend';
        }

        // Private Methods

    }, {
        key: "buildOut",
        value: function buildOut() {

            var content, contentHolder, docFrag;

            /*
             * If content is an HTML string, append the HTML string.
             * If content is a domNode, append its content.
             */

            if (typeof this.options.content === "string") {
                content = this.options.content;
            } else {
                content = this.options.content.innerHTML;
            }

            // Create a DocumentFragment to build with
            docFrag = document.createDocumentFragment();

            // Create modal element
            this.modal = document.createElement("div");
            this.modal.className = "base2-modal " + this.options.className;
            this.modal.style.minWidth = this.options.minWidth + "px";
            this.modal.style.maxWidth = this.options.maxWidth + "px";

            // If closeButton option is true, add a close button
            if (this.options.closeButton === true) {
                this.closeButton = document.createElement("button");
                this.closeButton.className = "base2-close close-button";
                this.closeButton.innerHTML = "&times;";
                this.modal.appendChild(this.closeButton);
            }

            // If overlay is true, add one
            if (this.options.overlay === true) {
                this.overlay = document.createElement("div");
                this.overlay.className = "base2-overlay " + this.options.className;
                docFrag.appendChild(this.overlay);
            }

            // Create content area and append to modal
            contentHolder = document.createElement("div");
            contentHolder.className = "base2-content";
            contentHolder.innerHTML = content;
            this.modal.appendChild(contentHolder);

            // Append modal to DocumentFragment
            docFrag.appendChild(this.modal);

            // Append DocumentFragment to body
            document.body.appendChild(docFrag);
        }
    }, {
        key: "extendDefaults",
        value: function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
    }, {
        key: "initializeEvents",
        value: function initializeEvents() {

            if (this.closeButton) {
                this.closeButton.addEventListener('click', this.close.bind(this));
            }

            if (this.overlay) {
                this.overlay.addEventListener('click', this.close.bind(this));
            }
        }
    }, {
        key: "transitionSelect",
        value: function transitionSelect() {
            var el = document.createElement("div");
            if (el.style.WebkitTransition) return "webkitTransitionEnd";
            if (el.style.OTransition) return "oTransitionEnd";
            return 'transitionend';
        }
    }]);

    return Modales6;
})();

var myContent = document.getElementById('content');

var myModal = new Modales6({
    content: myContent
});

var triggerModalES6 = document.getElementById('trigger'); // find id

triggerModalES6.addEventListener('click', function () {
    // add a listener to the elment
    myModal.open(); // open it
});