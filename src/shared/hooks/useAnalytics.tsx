import { useRouter } from "next/router";
import Script from "next/script";

export const AnalyticsScripts = () => {
    const { pathname } = useRouter();

    const isAdmin = pathname.startsWith("/fsjfnsdklflsdkfdferkg");

    if (isAdmin) return null;

    return (
        <>
            {/* Google Tag Manager */}
            <Script id="gtm-init" strategy="afterInteractive">
                {`
                    (function(w,d,s,l,i,cid){
                        w[l]=w[l]||[];
                        w.pclick_client_id = cid;
                        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),
                            dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;
                        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-P23G9N','88206');
                `}
            </Script>

            {/* Yandex Metrika */}
            <Script id="yandex-metrika" strategy="afterInteractive">
                {`
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){
                            (m[i].a=m[i].a||[]).push(arguments)
                        };
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {
                            if (document.scripts[j].src === r) { return; }
                        }
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                    ym(53695831, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                    });
                `}
            </Script>

            {/* Yandex fallback */}
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/53695831"
                        style={{ position: "absolute", left: "-9999px" }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
};
