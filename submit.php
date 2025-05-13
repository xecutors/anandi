<!DOCTYPE html>
<html id="namaste" lang="de">
    <head>
        <title>Anandi Yoga - Anmeldung</title>
        <meta name="theme-color" content="#d4b78f" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Traditional Hatha Yoga, Sivananda Style, Classes, Private Lessons, Zürich, Thalwil, Kerala">
        <link href="anandi.css" rel="stylesheet" type="text/css" media="screen" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300,0,400;1,100;1,200;1,300,1,400&display=swap" rel="stylesheet">
        <style>
            body {
                min-height: 100vh;
                margin: 0;
            }
            .container {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }
            section {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <nav class="d-flex justify-content-between gap-3">
                <ul>
                    <li><a href="/#namaste">Namaste</a></li>
                    <li><a href="/#ueber-mich">Über mich</a></li>
                    <li><a href="/#yoga-als-therapie">Yoga als Therapie</a></li>
                    <li><a href="/#business-event-yoga">Business & Event Yoga</a></li>
                    <li><a href="/#classes">Kurse</a></li>
                    <li><a href="/#preise">Preise</a></li>
                    <li><a href="/#kontakt">Kontakt</a></li>
                </ul>
                <ul>
                    <li><a href="/hairspa">Hairspa</a></li>
                    <li><a href="/ayurveda">Ayurveda</a></li>
                </ul>
            </nav>
            <section>
                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $name       = htmlspecialchars($_POST["name"]);
                    $email      = htmlspecialchars($_POST["email"]);
                    $phone      = htmlspecialchars($_POST["phone"]);
                    $kurse      = isset($_POST["kurs"]) ? implode(", ", $_POST["kurs"]) : '';
                    $tage       = isset($_POST["tage"]) ? implode(", ", $_POST["tage"]) : '';
                    $zeiten     = isset($_POST["zeit"]) ? implode(", ", $_POST["zeit"]) : '';
                    $orte       = isset($_POST["ort"]) ? implode(", ", $_POST["ort"]) : '';
                    $motivation = htmlspecialchars($_POST["motivation"]);

                    // In Datei speichern
                    $csv_line = "\"$name\",\"$email\",\"$phone\",\"$kurse\",\"$tage\",\"$zeiten\",\"$orte\",\"$motivation\"\n";
                    file_put_contents("anmeldungen.csv", $csv_line, FILE_APPEND);

                    // E-Mail senden
                    $to = "vedran@unchained.shop";
                    $subject = "Neue Yoga Anmeldung von $name";
                    $message = "Name: $name\nE-Mail: $email\nTelefon: $phone\n\nKurse: $kurse\nWochentage: $tage\nZeiten: $zeiten\nOrte: $orte\n\nMotivation:\n$motivation";
                    $headers = "From: namaste@anandi.yoga\r\nReply-To: $email";
                    
                    mail($to, $subject, $message, $headers);
                    ?>
                    <div class="text-center">
                        <h2>Vielen Dank für Deine Anmeldung, <?php echo $name; ?>!</h2>
                        <p>Ich melde mich so bald wie möglich.</p>
                        <a href="/" class="button mt-4">Zurück zur Startseite</a>
                    </div>
                    <?php
                } else {
                    ?>
                    <div class="text-center">
                        <h2>Ungültiger Zugriff</h2>
                        <a href="/" class="btn mt-4">Zurück zur Startseite</a>
                    </div>
                    <?php
                }
                ?>
            </section>
        </div>
    </body>
</html>