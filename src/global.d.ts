import * as React from 'react';

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements {
                'dotlottie-player': any;
            }
        }
    }
    namespace JSX {
        interface IntrinsicElements {
            'dotlottie-player': any;
        }
    }
}

declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

export { };
