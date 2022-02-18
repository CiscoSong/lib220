function lib220(config) {
    function hexColorChannel(n) {
        var v = (Math.floor(n * 255)).toString(16);
        if (v.length < 2) {
            v = '0' + v;
        }
        return v;
    }
    function rgbToHex(rgb) {
        var hex = '#';
        for (var i = 0; i < 3; ++i) {
            hex += hexColorChannel(rgb[i]);
        }
        return hex;
    }
    function argCheck(func, p, paramTypes) {
        try {
            var n = paramTypes.length;
            if (p.length !== n) {
                throw new TypeError("Invalid call to ".concat(func, ": ").concat(n, " arguments required but ").concat(p.length, " given"));
            }
            for (var i = 0; i < n; ++i) {
                var t = typeof (p[i]);
                if (t !== paramTypes[i]) {
                    throw new TypeError("Invalid call to ".concat(func, ": argument ").concat(i, " expected ").concat(paramTypes[i], " but ").concat(t, " given"));
                }
            }
        }
        catch (e) {
            if (e.toString().includes("Invalid call to ".concat(func, ":"))) {
                // This is one of our expected errors.
                throw (e);
            }
            else {
                // Unknown error.
                throw new Error("Invalid call to ".concat(func, ": ").concat(e));
            }
        }
    }
    function validateColor(col) {
        try {
            if (col.length !== 3 ||
                typeof (col[0]) !== 'number' ||
                typeof (col[1]) !== 'number' ||
                typeof (col[2]) !== 'number') {
                throw new TypeError("Invalid color value");
            }
        }
        catch (e) {
            throw new TypeError("Invalid color value");
        }
    }
    var DrawingCanvas = /** @class */ (function () {
        function DrawingCanvas(w, h) {
            this.width = 1;
            this.height = 1;
            this.ctx = undefined;
            argCheck('DrawingCanvas constructor', arguments, ['number', 'number']);
            this.width = w;
            this.height = h;
            if (typeof document === 'undefined') {
                return; // for node
            }
            var canvases = document.getElementById('canvases'), canvas = document.createElement('canvas');
            canvas.setAttribute('width', this.width.toString());
            canvas.setAttribute('height', this.height.toString());
            this.ctx = canvas.getContext('2d');
            canvas.style.paddingBottom = '5px';
            canvas.style.display = 'block';
            canvases.appendChild(canvas);
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
        DrawingCanvas.prototype.drawLine = function (x1, y1, x2, y2, col) {
            argCheck('drawLine', arguments, ['number', 'number', 'number', 'number', 'object']);
            validateColor(col);
            if (this.ctx === undefined) {
                return; // for node
            }
            this.ctx.strokeStyle = rgbToHex(col);
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        };
        DrawingCanvas.prototype.drawArc = function (x, y, r, a0, a1, col) {
            argCheck('drawArc', arguments, ['number', 'number', 'number', 'number', 'number', 'object']);
            validateColor(col);
            if (this.ctx === undefined) {
                return; // for node
            }
            this.ctx.strokeStyle = rgbToHex(col);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, a0, a1);
            this.ctx.stroke();
        };
        DrawingCanvas.prototype.drawCircle = function (x, y, r, col) {
            argCheck('drawCircle', arguments, ['number', 'number', 'number', 'object']);
            validateColor(col);
            this.drawArc(x, y, r, 0, 2 * Math.PI, col);
        };
        DrawingCanvas.prototype.drawFilledCircle = function (x, y, r, col) {
            argCheck('drawCircle', arguments, ['number', 'number', 'number', 'object']);
            validateColor(col);
            if (this.ctx === undefined) {
                return; // for node
            }
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fillStyle = rgbToHex(col);
            this.ctx.fill();
        };
        DrawingCanvas.prototype.clear = function () {
            argCheck('clear', arguments, []);
            if (this.ctx === undefined) {
                return; // for node
            }
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.width, this.height);
        };
        return DrawingCanvas;
    }());
    var FudgedImageData = /** @class */ (function () {
        function FudgedImageData(width, height) {
            this.width = 1;
            this.height = 1;
            this.data = new Uint8ClampedArray(4);
            if (arguments.length !== 2) {
                throw new TypeError("Failed to construct Node 'ImageData': 2 arguments required but ".concat(arguments.length, " given"));
            }
            if ((typeof width !== 'number' || width === 0)) {
                throw new Error('Failed to construct \'ImageData\': width is zero or not a number.');
            }
            if ((typeof height !== 'number' || height === 0)) {
                throw new Error('Failed to construct \'ImageData\': width is zero or not a number.');
            }
            this.width = width;
            this.height = height;
            this.data = new Uint8ClampedArray(4 * this.width * this.height);
        }
        return FudgedImageData;
    }());
    function createImageData(w, h) {
        return (typeof ImageData !== 'undefined') ?
            new ImageData(w, h) : new FudgedImageData(w, h);
    }
    function assertValidPixel(pixel) {
        if (pixel.length !== 3) {
            throw new Error("A pixel value must be a 3-element array");
        }
        for (var i = 0; i < 3; i++) {
            if (typeof pixel[i] !== 'number') {
                throw new Error("Pixel channel value must be a number");
            }
            if (pixel[i] < 0.0 || pixel[i] > 1.0) {
                throw new Error("Pixel channel value ".concat(pixel[i], " is invalid"));
            }
        }
    }
    function EncapsulatedImage(imageData) {
        var data = imageData.data, w = imageData.width, h = imageData.height;
        function assertValidCoordinate(x, y) {
            if (x < 0 || y < 0 || x >= w || y >= h) {
                throw new Error("Pixel coordinate (".concat(x, ", ").concat(y, ") is invalid. The image has height ").concat(h, " and width ").concat(w, "."));
            }
        }
        return Object.freeze({
            width: w,
            height: h,
            copy: function () {
                var copiedImage = EncapsulatedImage(createImageData(w, h));
                var pixel;
                for (var i = 0; i < w; i++) {
                    for (var j = 0; j < h; j++) {
                        pixel = this.getPixel(i, j);
                        copiedImage.setPixel(i, j, pixel);
                    }
                }
                return copiedImage;
            },
            show: function () {
                if (typeof document === 'undefined') {
                    return; //  for node
                }
                var canvases = document.getElementById('canvases'), canvas = document.createElement('canvas');
                canvas.setAttribute('width', w);
                canvas.setAttribute('height', h);
                var ctx = canvas.getContext('2d');
                ctx.putImageData(imageData, 0, 0);
                canvas.style.display = 'block';
                canvas.style.paddingBottom = '5px';
                canvases.appendChild(canvas);
            },
            setPixel: function (x, y, c) {
                if (arguments.length !== 3) {
                    throw new Error(".setPixel expects 3 arguments, received ".concat(arguments.length));
                }
                assertValidCoordinate(x, y);
                assertValidPixel(c);
                var index = 4 * (y * w + x);
                data[index] = Math.round(c[0] * 255);
                data[index + 1] = Math.round(c[1] * 255);
                data[index + 2] = Math.round(c[2] * 255);
                data[index + 3] = 255;
            },
            getPixel: function (x, y) {
                if (arguments.length !== 2) {
                    throw new Error(".getPixel expects 2 arguments, received ".concat(arguments.length));
                }
                assertValidCoordinate(x, y);
                var index = 4 * (y * w + x), p = config.stopifyArray([
                    data[index] / 255.0,
                    data[index + 1] / 255.0,
                    data[index + 2] / 255.0
                ]);
                return p;
            }
        });
    }
    /*
     * A handler for loading files
     *
     * @param {*} defaultOutput - The default object to return when function is not called on browser.
     * @param {(runner: any, response: any, ...args: any[]) => void} loadFunction -
     *          The function that loads the correct file format (must have runner.continueImmediate).
     */
    function loadURLHandler(defaultOutput, loadFunction) {
        return function (url) {
            if (typeof document === 'undefined') {
                return defaultOutput;
            }
            var runnerResult = config.getRunner();
            if (runnerResult.kind === 'error') {
                throw new Error('Program is not running');
            }
            var runner = runnerResult.value.runner;
            return runner.pauseImmediate(function () {
                var userEmail = localStorage.getItem('userEmail'), sessionId = localStorage.getItem('sessionId');
                if (userEmail === null || sessionId === null) {
                    if (runnerResult.value.isRunning) {
                        runner.continueImmediate({
                            type: 'exception',
                            stack: [],
                            value: new Error("User is not logged in")
                        });
                    }
                    else {
                        runnerResult.value.onStopped();
                    }
                }
                var encodedURL = encodeURIComponent(url);
                var baseUrl = config.baseUrl;
                var getUrlLink = "".concat(baseUrl, "geturl?");
                var queryURL = "".concat(getUrlLink, "url=").concat(encodedURL, "&user=").concat(userEmail, "&session=").concat(sessionId);
                fetch(queryURL).then(function (response) {
                    if (!response.ok) {
                        if (runnerResult.value.isRunning) {
                            runner.continueImmediate({
                                type: 'exception',
                                stack: [],
                                value: new Error("Could not load from URL, URL may be invalid or redirected")
                            });
                        }
                        else {
                            runnerResult.value.onStopped();
                        }
                    }
                    return response;
                }).then(function (response) {
                    loadFunction(runnerResult.value, response);
                })["catch"](function (err) {
                    if (runnerResult.value.isRunning) {
                        runner.continueImmediate({
                            type: 'exception',
                            stack: [],
                            value: new Error("Could not load from URL")
                        });
                    }
                    else {
                        runnerResult.value.onStopped();
                    }
                });
            });
        };
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    return {
        DrawingCanvas: DrawingCanvas,
        newCanvas: function (w, h) {
            argCheck('newCanvas', arguments, ['number', 'number']);
            return new DrawingCanvas(w, h);
        },
        loadImageFromURL: loadURLHandler(EncapsulatedImage(createImageData(50, 50)), function (runner, response) {
            var stopifyRunner = runner.runner, img = new Image();
            img.setAttribute('crossOrigin', 'Anonymous');
            img.onerror = function () {
                if (runner.isRunning) {
                    stopifyRunner.continueImmediate({
                        type: 'exception',
                        stack: [],
                        value: new Error("Image could not be loaded")
                    });
                }
                else {
                    runner.onStopped();
                }
            };
            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.setAttribute('height', String(img.height));
                canvas.setAttribute('width', String(img.width));
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                var imageData = ctx.getImageData(0, 0, img.width, img.height);
                if (runner.isRunning) {
                    stopifyRunner.continueImmediate({
                        type: 'normal',
                        value: EncapsulatedImage(imageData)
                    });
                }
                else {
                    runner.onStopped();
                }
            };
            response.blob().then(function (blob) {
                img.src = URL.createObjectURL(blob);
            })["catch"](function () {
                if (runner.isRunning) {
                    stopifyRunner.continueImmediate({
                        type: 'exception',
                        stack: [],
                        value: new Error("Image URL could not be loaded")
                    });
                }
                else {
                    stopifyRunner.pause(function () { });
                }
            });
        }),
        createImage: function (width, height, fill) {
            argCheck('createImage', arguments, ['number', 'number', 'object']);
            if (arguments.length !== 3) {
                throw new Error("createImage expects 3 arguments, received ".concat(arguments.length));
            }
            var img = EncapsulatedImage(createImageData(width, height));
            assertValidPixel(fill);
            for (var i = 0; i < width; i++) {
                for (var j = 0; j < height; j++) {
                    img.setPixel(i, j, fill);
                }
            }
            return img;
        },
        getProperty: function (o, key) {
            argCheck('getProperty', arguments, ['object', 'string']);
            return o.hasOwnProperty(key) ? { found: true, value: o[key] } : { found: false };
        },
        setProperty: function (o, key, value) {
            if (arguments.length !== 3) {
                throw new Error("setProperty expects 3 arguments, received ".concat(arguments.length));
            }
            argCheck('setProperty', [o, key], ['object', 'string']);
            o[key] = value;
        },
        loadJSONFromURL: loadURLHandler([{
                "name": "Back-Health Chiropractic",
                "city": "Phoenix",
                "state": "AZ",
                "stars": 5,
                "review_count": 19,
                "attributes": {
                    "AcceptsInsurance": true,
                    "ByAppointmentOnly": true,
                    "BusinessAcceptsCreditCards": true
                },
                "categories": [
                    "Chiropractors",
                    "Health & Medical"
                ]
            }, {
                "name": "TRUmatch",
                "city": "Scottsdale",
                "state": "AZ",
                "stars": 3,
                "review_count": 3,
                "attributes": {},
                "categories": [
                    "Professional Services",
                    "Matchmakers" /* tslint:enable:quotemark object-literal-key-quotes */
                ]
            }], function (runner, response) {
            response.json().then(function (jsonObj) {
                runner.runner.continueImmediate({
                    type: 'normal',
                    value: config.stopifyObjectArrayRecur(jsonObj)
                });
            })["catch"](function () {
                runner.isRunning ?
                    runner.runner.continueImmediate({
                        type: 'exception',
                        stack: [],
                        value: new Error("JSON file could not be loaded")
                    }) :
                    runner.runner.pause(function () { });
            });
        }),
        sleep: function (milliseconds) {
            argCheck('sleep', arguments, ['number']);
            if (typeof document === 'undefined') {
                return; // does not do anything if not run on browser
            }
            var runnerResult = config.getRunner();
            if (runnerResult.kind === 'error') {
                throw new Error('Program is not running');
            }
            var runner = runnerResult.value, stopifyRunner = runner.runner;
            return stopifyRunner.pauseImmediate(function () {
                window.setTimeout(function () {
                    if (runner.isRunning) {
                        stopifyRunner.continueImmediate({ type: 'normal', value: undefined });
                    }
                    else {
                        runner.onStopped();
                    }
                }, milliseconds);
            });
        },
        input: function (message) {
            argCheck('input', arguments, ['string']);
            if (typeof document === 'undefined') {
                return 'user input is disabled'; // when run on GradeScope
            }
            var runnerResult = config.getRunner();
            if (runnerResult.kind === 'error') {
                throw new Error('Program is not running');
            }
            var runner = runnerResult.value, stopifyRunner = runner.runner;
            return stopifyRunner.pauseImmediate(function () {
                var userInput = prompt(message);
                if (userInput === null) { // if user did not write anything/pressed cancel
                    if (runner.isRunning) {
                        stopifyRunner.continueImmediate({
                            type: 'normal',
                            value: '' // return empty string
                        });
                    }
                    else {
                        runner.onStopped();
                    }
                }
                if (runner.isRunning) {
                    stopifyRunner.continueImmediate({
                        type: 'normal',
                        value: userInput
                    });
                }
                else {
                    runner.onStopped();
                }
            });
        }
    };
}
