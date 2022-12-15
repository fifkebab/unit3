import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

export const Ear = (props) => {
    return(
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_16_431)" {...props}>
            <Path d="M6 8.5C6 6.77609 6.68482 5.12279 7.90381 3.90381C9.12279 2.68482 10.7761 2 12.5 2C14.2239 2 15.8772 2.68482 17.0962 3.90381C18.3152 5.12279 19 6.77609 19 8.5C19 14.5 13 14.5 13 18.5C13 18.9596 12.9095 19.4148 12.7336 19.8394C12.5577 20.264 12.2999 20.6499 11.9749 20.9749C11.6499 21.2999 11.264 21.5577 10.8394 21.7336C10.4148 21.9095 9.95963 22 9.5 22C9.04037 22 8.58525 21.9095 8.16061 21.7336C7.73597 21.5577 7.35013 21.2999 7.02513 20.9749C6.70012 20.6499 6.44231 20.264 6.26642 19.8394C6.09053 19.4148 6 18.9596 6 18.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6C11.837 6 11.2011 6.26339 10.7322 6.73223C10.2634 7.20107 10 7.83696 10 8.5V9.5C10.5304 9.5 11.0391 9.71071 11.4142 10.0858C11.7893 10.4609 12 10.9696 12 11.5C12 12.0304 11.7893 12.5391 11.4142 12.9142C11.0391 13.2893 10.5304 13.5 10 13.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </G>
            <Defs>
            <ClipPath id="clip0_16_431">
            <Rect width="24" height="24" fill="white"/>
            </ClipPath>
            </Defs>
        </Svg>

    )
}

export const Contrast = (props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clip-path="url(#clip0_21_498)" {...props}>
                <Path d="M11.6595 22.0137C16.8862 22.0137 21.1233 17.6769 21.1233 12.3271C21.1233 6.97739 16.8862 2.64056 11.6595 2.64056C6.43287 2.64056 2.1958 6.97739 2.1958 12.3271C2.1958 17.6769 6.43287 22.0137 11.6595 22.0137Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M11.6594 18.1391C13.1654 18.1391 14.6097 17.5268 15.6746 16.4368C16.7394 15.3469 17.3377 13.8686 17.3377 12.3271C17.3377 10.7857 16.7394 9.30743 15.6746 8.21748C14.6097 7.12753 13.1654 6.5152 11.6594 6.5152V18.1391Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </G>
            <Defs>
                <ClipPath id="clip0_21_498">
                    <Rect width="22.713" height="23.2478" fill="white" transform="translate(0.302979 0.703247)"/>
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export const ViewIcon = (props) => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M5.03491 11.9765C5.03491 11.9765 7.44344 7.13318 11.6595 7.13318C15.8747 7.13318 18.2842 11.9765 18.2842 11.9765C18.2842 11.9765 15.8747 16.8198 11.6595 16.8198C7.44344 16.8198 5.03491 11.9765 5.03491 11.9765Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.6595 12.9451C11.9105 12.9451 12.1512 12.8431 12.3287 12.6614C12.5062 12.4798 12.6059 12.2334 12.6059 11.9765C12.6059 11.7196 12.5062 11.4732 12.3287 11.2915C12.1512 11.1099 11.9105 11.0078 11.6595 11.0078C11.4085 11.0078 11.1678 11.1099 10.9903 11.2915C10.8128 11.4732 10.7131 11.7196 10.7131 11.9765C10.7131 12.2334 10.8128 12.4798 10.9903 12.6614C11.1678 12.8431 11.4085 12.9451 11.6595 12.9451V12.9451Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M20.1768 16.8198V18.7571C20.1768 19.2709 19.9774 19.7637 19.6225 20.127C19.2675 20.4903 18.7861 20.6945 18.2841 20.6945H5.03484C4.53285 20.6945 4.05142 20.4903 3.69646 20.127C3.3415 19.7637 3.14209 19.2709 3.14209 18.7571V16.8198" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M20.1768 7.13318V5.19586C20.1768 4.68205 19.9774 4.18929 19.6225 3.82597C19.2675 3.46265 18.7861 3.25854 18.2841 3.25854H5.03484C4.53285 3.25854 4.05142 3.46265 3.69646 3.82597C3.3415 4.18929 3.14209 4.68205 3.14209 5.19586V7.13318" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}


export const Focus = (props) => {
    return (
        <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <Path d="M11.6594 15.4379C13.2274 15.4379 14.4986 14.1369 14.4986 12.532C14.4986 10.927 13.2274 9.62598 11.6594 9.62598C10.0914 9.62598 8.82031 10.927 8.82031 12.532C8.82031 14.1369 10.0914 15.4379 11.6594 15.4379Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M3.14209 7.68872V5.7514C3.14209 5.2376 3.3415 4.74483 3.69646 4.38151C4.05142 4.0182 4.53285 3.81409 5.03484 3.81409H6.92759" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M16.3914 3.81409H18.2841C18.7861 3.81409 19.2675 4.0182 19.6225 4.38151C19.9774 4.74483 20.1769 5.2376 20.1769 5.7514V7.68872" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M20.1769 17.3752V19.3126C20.1769 19.8264 19.9774 20.3191 19.6225 20.6824C19.2675 21.0458 18.7861 21.2499 18.2841 21.2499H16.3914" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M6.92759 21.2499H5.03484C4.53285 21.2499 4.05142 21.0458 3.69646 20.6824C3.3415 20.3191 3.14209 19.8264 3.14209 19.3126V17.3752" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}


export const CheckmarkIcon = (props) => {
    return (
        <Svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17 1L6 12L1 7" {...props} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}