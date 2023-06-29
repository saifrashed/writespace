
import Head from "next/head";
import 'tailwindcss/tailwind.css';
import NavBar from "@/components/NavBar"

const PrivacyPolicy = () => {

    return (
        <>
            <Head>
                <title>Privacy Policy - WriteSpace</title>
                <meta name="description" content="Writing. Fun, Intuitive." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>

            <NavBar showLogout={false} />
            <div className="px-4 sm:px-6 lg:px-8 mt-14">
                <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">Privacy policy</h1>
                    <p className="mt-4 text-base leading-7 text-[#4b5563]">Laatst bijgewerkt op 29 juni 2023</p>
                </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[40rem]">
                    <p className="mb-4 text-sm text-[#4b5563]">
                        Welkom bij WriteSpace! Dit privacybeleid beschrijft hoe wij jouw persoonlijke informatie verzamelen, gebruiken, delen en beschermen in verband met het gebruik van onze applicatie, WriteSpace. We hechten veel waarde aan jouw privacy en zorgen ervoor dat jouw persoonlijke informatie vertrouwelijk en in overeenstemming met de geldende privacywetgeving wordt behandeld.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Verzamelde informatie</h2>

                    <h3 className="mb-4 font-bold text-md">Gebruikersinformatie</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Bij het gebruik van WriteSpace verzamelen wij bepaalde persoonlijke informatie van gebruikers, zoals:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Naam</li>
                        <li>E-mailadres</li>
                        <li>Gebruikers-ID (toegewezen door Canvas)</li>
                        <li>Gebruikersinstellingen en voorkeuren</li>
                    </ul>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Opdrachtinformatie</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Wanneer studenten opdrachten via de Canvas API indienen, verzamelen wij de volgende informatie in verband met de schrijfopdrachten:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Inhoud van de ingediende opdrachten</li>
                        <li>Datum en tijd van indiening</li>
                        <li>Eventuele bijlagen bij de opdrachten</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Gebruik van verzamelde informatie</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Wij gebruiken de verzamelde informatie voor de volgende doeleinden:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">

                        <li>Het leveren en verbeteren van de functionaliteit van WriteSpace</li>
                        <li>Het verwerken en beheren van ingediende opdrachten</li>
                        <li>Het communiceren met gebruikers met betrekking tot hun opdrachten en de applicatie</li>
                        <li>Het bieden van klantenondersteuning en het oplossen van problemen</li>
                        <li>Het analyseren van het gebruik van de applicatie om de gebruikerservaring te verbeteren</li>
                        <li>Het verkrijgen van inzichten om de gebruikerservaring te verbeteren</li>
                        <li>Het waarborgen van de veiligheid en beveiliging van WriteSpace</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Gegevensbeheer</h2>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Gegevensopslag en beveiliging</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Wij nemen redelijke maatregelen om jouw persoonlijke informatie te beschermen tegen ongeoorloofde toegang, openbaarmaking, wijziging of vernietiging. Jouw gegevens worden opgeslagen op beveiligde servers en we hanteren passende technische en organisatorische maatregelen om de gegevens te beschermen.
                    </p>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Gegevensbewaring</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Wij bewaren jouw persoonlijke informatie gedurende de periode die nodig is om de doeleinden te bereiken waarvoor de informatie is verzameld, tenzij een langere bewaartermijn wettelijk vereist of toegestaan is.
                    </p>

                    <h3 className="mb-4 mt-8 font-bold text-lg">Delen van informatie met derden</h3>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Wij delen jouw persoonlijke informatie niet met derden, behalve in de volgende gevallen:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Met jouw voorafgaande toestemming</li>
                        <li>Wanneer het delen van informatie noodzakelijk is om te voldoen aan wettelijke verplichtingen, zoals het reageren op gerechtelijke bevelen of wettelijke procedures</li>
                        <li>Met vertrouwde dienstverleners die namens ons bepaalde diensten uitvoeren, zoals hostingproviders of klantondersteuning</li>
                    </ul>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Jouw rechten</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Je hebt bepaalde rechten met betrekking tot jouw persoonlijke informatie. Je kunt:
                    </p>

                    <ul className="space-y-0.5 text-[#4b5563] text-sm list-disc list-inside">
                        <li>Toegang vragen tot de persoonlijke informatie die wij over jou hebben</li>
                        <li>Onjuiste informatie corrigeren of bijwerken</li>
                        <li>Verzoeken om verwijdering van jouw persoonlijke informatie</li>
                        <li>Bezwaar maken tegen bepaalde verwerkingen van jouw persoonlijke informatie</li>
                        <li>Jouw toestemming voor het verwerken van jouw persoonlijke informatie intrekken (wat van invloed kan zijn op het gebruik van WriteSpace)</li>
                    </ul>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Neem contact met ons op via de onderstaande contactgegevens om gebruik te maken van deze rechten of als je vragen of opmerkingen hebt met betrekking tot jouw privacy.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Cookies</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        WriteSpace maakt gebruik van cookies en vergelijkbare technologieën om de functionaliteit van de applicatie te verbeteren en een gepersonaliseerde ervaring te bieden. Door WriteSpace te gebruiken, stem je in met het gebruik van cookies in overeenstemming met ons Cookiebeleid.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Wijzigingen in het privacybeleid</h2>

                    <p className="mb-4 text-sm text-[#4b5563]">
                        Dit privacybeleid kan van tijd tot tijd worden gewijzigd om bijgewerkte privacypraktijken weer te geven of om te voldoen aan relevante wet- en regelgeving. Wij raden je aan om regelmatig ons privacybeleid te controleren voor eventuele wijzigingen.
                    </p>

                    <h2 className="mb-4 mt-8 font-bold text-xl">Contactgegevens</h2>
                    <p className="mb-4 text-sm text-[#4b5563]">Als je vragen, opmerkingen of verzoeken hebt met betrekking tot dit privacybeleid, neem dan contact met ons op via
                        <a className="font-bold" href="mailto:bobkreugel@hotmail.com"> bobkreugel@hotmail.com</a>.
                    </p>
                    <p className="mb-10 lg:mb-24 text-sm text-[#4b5563]">Bedankt voor het gebruik van WriteSpace en het vertrouwen dat je in ons stelt met betrekking tot jouw persoonlijke informatie.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
