/// <reference types="nativewind/types" />
declare module "*.png" {
    const content: {
      uri: string;
      width: number;
      height: number;
      [key: string]: any; // For additional properties Expo might add
    };
    export default content;
  }
  
    
    declare module "*.jpg" {
      const content: string;
      export default content;
    }
    
    declare module "*.jpeg" {
      const content: string;
      export default content;
    }
    
    declare module "*.svg" {
      const content: string;
      export default content;
    }
    
  