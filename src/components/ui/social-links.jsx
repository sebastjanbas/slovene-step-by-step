import React from 'react'

export const SocialLinks = ({ href, srOnly, children }) => {

    return (
        <a href={href} className='' target="_blank">
            <span className="sr-only">{srOnly}</span>
            {children}
        </a>
    )
}
