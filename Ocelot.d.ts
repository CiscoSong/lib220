interface Hire {
   company: number;
   candidate: number;
}

declare function wheat1(companies: number[][], candidates: number[][]): Hire[];

declare function chaff1(companies: number[][], candidates: number[][]): Hire[];