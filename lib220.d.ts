interface Canvas {
    /**
     * The drawLine function draws a line on the canvas that stretches from a designated
     * start point to a designated endpoint.
     * @param x1 The location on the x-axis of the desired start point of the line
     * @param y1 The location on the y-axis of the desired start point of the line
     * @param x2 The location on the x-axis of the desired end point of the line
     * @param y2 The location on the y-axis of the desired end point of the line
     * @param color The desired color of the line given as a tri-color pixel
     */
    drawLine(x1: number, y1: number, x2: number, y2: number, color: [number, number, number]): void;
    
    /**
     * The drawArc function draws an arc of a designated color centered at a given point
     * with a given radius. The function will start drawing the arc from the location
     * startRadians to the location end Radians in a clockwise direction.
     * @param x The location on the x-axis of the center of the desired arc
     * @param y The location on the y-axis of the center of the desired arc
     * @param radius The size of the radius of the desired arc
     * @param startRadians The location on the unit circle of the start of the arc
     * @param endRadians The location on the unit circle of the end of the arc
     * @param color The desired color of the arc given as a tri-color pixel
     */
    drawArc(x: number, y: number, radius: number, startRadians: number, endRadians: number, color: [number, number, number]): void;
    
    /**
     * The drawCircle function draws a circle of a designated color centered at a given
     * point with a given radius.
     * @param x The location on the x-axis of the center of the desired circle
     * @param y The location on the y-axis of the center of the desired circle
     * @param radius The size of the radius of the desired circle
     * @param color The desired color of the arc given as a tri-color pixel
     */
    drawCircle(x: number, y: number, radius: number, color: [number, number, number]): void;
    
    /**
     * The drawFilledCircle function draws a circle of a designated color centered at a
     * given point with a given radius.
     * @param x The location on the x-axis of the center of the desired circle
     * @param y The location on the y-axis of the center of the desired circle
     * @param radius The size of the radius of the desired circle
     * @param color The desired color of the arc given as a tri-color pixel
     */
    drawFilledCircle(x: number, y: number, radius: number, color: [number, number, number]): void;
    
    /**
     * The clear function clears the canvas.
     */
    clear(): void;
}

interface Image {
    /**
     * The getPixel function is designed to access and get rgb channel data from a
     * specified (x, y) location in an image. You can not directly change the value of
     * the accessed pixel using getPixel.
     * @param x the x coordinate of the pixel in the image
     * @param y the y coordinate of the pixel in the image
     */
    getPixel(x: number, y: number): [number, number, number];
    
    /**
     * The setPixel function is designed to access and alter rgb channel data from a
     * specified (x, y) location in an image. You can directly change the value of the
     * accessed pixel using setPixel by inputting a new pixel value.
     * @param x the x coordinate of the pixel in the image
     * @param y the y coordinate of the pixel in the image
     * @param rgb the desired pixel values between 0 and 1 for the rgb channels
     */
    setPixel(x: number, y: number, rgb: [number, number, number]);
    
    /**
     * The copy function will create a shallow copy of a specified image.
     */
    copy(): Image;

    /**
     * The show function will display a desired image on the canvas.
     */
    show(): void;
}

interface GetPropertyResult {
    /**
     * Whether or not the property was found.
     */
    found: boolean;
    /**
     * The value of the property, if that property was found.
     */
    value: any;
}

declare namespace lib220 {   
    /**
     * The newCanvas function is creates a blank white canvas and displays it in Ocelot.
     * @param width the width of the desired canvas
     * @param height the height of the desired canvas
     */
    function newCanvas(width: number, height: number): Canvas;

    /**
     * The loadImageFromURL function imports an image to the workspace from a given url.
     * @param url web link containing the storage location and data of a desired image.
     */
    function loadImageFromURL(url: string): Image;
    
    /**
     * The createImage function will create a new image with a desired width, height,
     * and fill of desired rgb channel pixel values.
     * @param width the width of the desired image
     * @param height the height of the desired image
     * @param rgb the desired pixel values between 0 and 1 for the rgb channels
     */
    function createImage(width: number, height: number, rgb: [number, number, number]): Image;

    /**
     * loadJSONFromURL loads a JSON file from a given URL and returns the JSON file as
     * a JavaScript object.
     * @param url the url that directs to plain JSON text
     */
    function loadJSONFromURL(url: string): Object;

    /**
     * Prompts for user input.
     * @param message message displayed when prompting for user input
     */
    function input(message: string): string;

    /**
     * Pauses the program for the specified amount of time.
     * @param ms the amount of time in milleseconds for which to pause the program
     */
    function sleep(ms: number): void;

}

/**
 * The test function defines a test.
 * @param description a description of what is being tested. It will be printed when
 * that particular test fails
 * @param f the function that is run when that paricular test is run
 */
declare function test(description: string, f: () => void): void;

/**
 * The assert function is meant to be used within a test. It throws an exception if
 * its input predicate is false.
 * @param predicate predicate that you are checking
 */
declare function assert(predicate: boolean): void;

/**
 * getProperty takes in a parsed JSON object and the string name of an object member
 * and returns another object. The returned object has two member variables, found and
 * value, to indicate whether the property with the specified string was found in the
 * object or not, and if so, to return its value.
 * @param object object to get the property from
 * @param prop a string that refers to the property of object
 */
declare function getProperty(object: Object, prop: string): GetPropertyResult;

/**
 * setProperty takes in a parsed JSON object, the string name of an object member,
 * and a value to set that member to.
 * @param object object to set the property from
 * @param prop a string that refers to the property of object
 * @param value value to set the property to
 */
declare function setProperty(object: Object, prop: string, value: any): void;