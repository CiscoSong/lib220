/**
 * Pixel value between 0 and 1 for the RGB channels.
 */
type Pixel = [number, number, number];

interface Canvas{
   /**
    * The drawLine function draws a line on the canvas that stretches from a designated start point to a designated endpoint.
    * 
    * @param x1 The location on the x-axis of the desired start point of the line.
    * @param y1 The location on the y-axis of the desired start point of the line.
    * @param x2 The location on the x-axis of the desired end point of the line.
    * @param y2 The location on the y-axis of the desired end point of the line.
    * @param color The desired color of the line given as a tri-color pixel.
    */
   drawLine(x1: number, y1: number, x2: number, y2: number, color: Pixel): void;

   /**
    * The drawArc function draws an arc of a designated color centered at a given point with a given radius.
    * The function will start drawing the arc from the location startRadians to the location endRadians in a clockwise direction.
    * 
    * @param x The location on the x-axis of the center of the desired arc.
    * @param y The location on the y-axis of the center of the desired arc.
    * @param radius The size of the radius of the desired arc.
    * @param startRadians The location on the unit circle of the start of the arc.
    * @param endRadians The location on the unit circle of the end of the arc.
    * @param color The desired color of the arc given as a tri-color pixel.
    */
   drawArc(x: number, y: number, radius: number, startRadians: number, endRadians: number, color: Pixel): void;

   /**
    * The drawCircle function draws a circle of a designated color centered at a given point with a given radius.
    * 
    * @param x The location on the x-axis of the center of the desired circle.
    * @param y The location on the y-axis of the center of the desired circle.
    * @param radius The size of the radius of the desired circle.
    * @param color The desired color of the arc given as a tri-color pixel.
    */
   drawCircle(x: number, y: number, radius: number, color: Pixel): void;

   /**
    * The drawFilledCircle function draws a circle of a designated color centered at a given point with a given radius.
    * 
    * @param x The location on the x-axis of the center of the desired circle.
    * @param y The location on the y-axis of the center of the desired circle.
    * @param radius The size of the radius of the desired circle.
    * @param color The desired color of the arc given as a tri-color pixel.
    */
   drawFilledCircle(x: number, y: number, radius: number, color: Pixel): void;

   /**
    * The clear function clears the canvas.
    */
   clear(): void;
}

interface Image{
   /**
    * The width of the image, set as the x coordinate, count from LEFT to RIGHT.
    */
   width: number;
   /**
    * The height of the image, set as the y coordinate, count from TOP to BOTTOM.
    */
   height: number;

   /**
    * The copy function will create a shallow copy of a specified image.
    */
   copy(): Image;

   /**
    * The show function will display a desired image on the canvas.
    */
   show(): void;

   /**
    * The setPixel function is designed to modify RGB channel data from a specified (x, y) location in an image.
    * 
    * @param x The x coordinate of the pixel in the image.
    * @param y The y coordinate of the pixel in the image.
    * @param p The desired Pixel value between 0 and 1 for the RGB channels.
    */
   setPixel(x: number, y: number, p: Pixel): void;

   /**
    * The getPixel function is designed to access and get RGB channel data from a specified (x, y) location in an image.
    * 
    * @param x The x coordinate of the pixel in the image.
    * @param y The y coordinate of the pixel in the image.
    */
   getPixel(x: number, y: number): Pixel;   
}

interface GetPropertyResult{
   /**
    * Whether or not the property was found.
    */
   found: boolean;
   /**
    * The value of the property.
    */
   value: any | undefined;
}

declare namespace lib220{
   /**
    * The newCanvas function is creates a blank white canvas and displays it in Ocelot.
    * 
    * @param width The width of the desired canvas.
    * @param height The height of the desired canvas.
    */
   function newCanvas(width: number, height: number): Canvas;

   /**
    * The loadImageFromURL function imports an image to the workspace from a given url.
    * 
    * @param url The URL of the desired image.
    */
   function loadImageFromURL(url: string): Image;

   /**
    * The createImage function will create a new image with a desired width, height, and fill of desired RGB channel pixel values.
    * 
    * @param width The width of the desired image.
    * @param height The height of the desired image.
    * @param p The default Pixel value for every pixel in the desired image.
    */
   function createImage(width: number, height: number, p: Pixel): Image;

   /**
    * The getProperty function takes in a parsed JSON object and the string name of an object member and returns another object.
    * 
    * @param object The object to get the property from.
    * @param property A string that refers to the property name of object.
    * @returns The returned object has two property variables: found and value.
    */
   function getProperty(object: Object, property: string): GetPropertyResult;

   /**
    * The setProperty function takes in a parsed JSON object, the string name of an object member, and a value to set that member to.
    * 
    * @param object The object to set the property to.
    * @param property A string that refers to the property name of the object.
    * @param value The value to set the property to
    */
   function setProperty(object: Object, property: string, value: any): void;

   /**
    * The loadJSONFromURL function loads a JSON file from a given URL and returns the JSON file as a JavaScript object.
    * 
    * @param url The URL that directs to plain JSON text.
    */
   function loadJSONFromURL(url: string): Object;

   /**
    * The sleep function pauses the program for the specified amount of time.
    * 
    * @param ms The amount of time in milleseconds.
    */
   function sleep(ms: number): void;

   /**
    * The input function prompts for user input.
    * 
    * @param message The message displayed when prompting for user input.
    * @returns A string that user input.
    */
   function input(message: string): string;
}

/**
 * The test function defines a test in Ocelot.
 * 
 * @param description A string describing the test.
 * @param func The function that run the test.
 */
declare function test(description: string, func: () => void): void;

/**
 * The assert function is meant to be used within a test.
 * It is used to judge the success or failure of the test.
 * 
 * @param predicate A boolean value used to determine the success or failure of the test. TRUE for success, FALSE for failure.
 */
declare function assert(predicate: boolean): void;
