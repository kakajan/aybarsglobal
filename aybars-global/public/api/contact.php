<?php
/**
 * AYBARS GLOBAL - Contact Form Email Handler
 * Professional email sending with validation and security
 *
 * @author AYBARS GLOBAL TRADING
 * @version 1.0.0
 */

// Enable error reporting for debugging (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 0);

// Set headers for JSON response
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
    ]);
    exit();
}

// Configuration
define('RECIPIENT_EMAIL', 'info@aybarsglobal.com');
define('SENDER_EMAIL', 'noreply@aybarsglobal.com');
define('COMPANY_NAME', 'AYBARS GLOBAL TRADING');
define('MAX_MESSAGE_LENGTH', 2000);
define('RATE_LIMIT_SECONDS', 60);
define('RATE_LIMIT_MAX_REQUESTS', 5);

// Multi-language messages
$messages = [
    'en' => [
        'success'              => 'Your message has been sent successfully. We will get back to you within 24-48 hours.',
        'error_general'        => 'An error occurred while sending your message. Please try again later.',
        'error_required'       => 'Please fill in all required fields.',
        'error_email'          => 'Please enter a valid email address.',
        'error_message_length' => 'Message is too long. Maximum 2000 characters allowed.',
        'error_rate_limit'     => 'Too many requests. Please wait a moment and try again.',
        'error_spam'           => 'Your message was detected as spam. Please try again.',
    ],
    'fa' => [
        'success'              => 'پیام شما با موفقیت ارسال شد. ظرف ۲۴ تا ۴۸ ساعت با شما تماس خواهیم گرفت.',
        'error_general'        => 'هنگام ارسال پیام خطایی رخ داد. لطفاً بعداً دوباره امتحان کنید.',
        'error_required'       => 'لطفاً تمام فیلدهای الزامی را پر کنید.',
        'error_email'          => 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
        'error_message_length' => 'پیام بسیار طولانی است. حداکثر ۲۰۰۰ کاراکتر مجاز است.',
        'error_rate_limit'     => 'درخواست‌های زیادی ارسال شده. لطفاً کمی صبر کنید و دوباره امتحان کنید.',
        'error_spam'           => 'پیام شما به عنوان اسپم شناسایی شد. لطفاً دوباره امتحان کنید.',
    ],
    'ar' => [
        'success'              => 'تم إرسال رسالتك بنجاح. سنعود إليك خلال 24-48 ساعة.',
        'error_general'        => 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً.',
        'error_required'       => 'يرجى ملء جميع الحقول المطلوبة.',
        'error_email'          => 'يرجى إدخال بريد إلكتروني صحيح.',
        'error_message_length' => 'الرسالة طويلة جداً. الحد الأقصى 2000 حرف.',
        'error_rate_limit'     => 'طلبات كثيرة جداً. يرجى الانتظار قليلاً والمحاولة مرة أخرى.',
        'error_spam'           => 'تم اكتشاف رسالتك كرسالة مزعجة. يرجى المحاولة مرة أخرى.',
    ],
    'tr' => [
        'success'              => 'Mesajınız başarıyla gönderildi. 24-48 saat içinde size geri döneceğiz.',
        'error_general'        => 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        'error_required'       => 'Lütfen tüm zorunlu alanları doldurun.',
        'error_email'          => 'Lütfen geçerli bir e-posta adresi girin.',
        'error_message_length' => 'Mesaj çok uzun. Maksimum 2000 karakter.',
        'error_rate_limit'     => 'Çok fazla istek. Lütfen biraz bekleyin ve tekrar deneyin.',
        'error_spam'           => 'Mesajınız spam olarak algılandı. Lütfen tekrar deneyin.',
    ],
    'ru' => [
        'success'              => 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в течение 24-48 часов.',
        'error_general'        => 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.',
        'error_required'       => 'Пожалуйста, заполните все обязательные поля.',
        'error_email'          => 'Пожалуйста, введите корректный email.',
        'error_message_length' => 'Сообщение слишком длинное. Максимум 2000 символов.',
        'error_rate_limit'     => 'Слишком много запросов. Пожалуйста, подождите и попробуйте снова.',
        'error_spam'           => 'Ваше сообщение определено как спам. Пожалуйста, попробуйте снова.',
    ],
];

/**
 * Get localized message
 */
function getMessage($key, $lang = 'en')
{
    global $messages;
    $lang = isset($messages[$lang]) ? $lang : 'en';
    return isset($messages[$lang][$key]) ? $messages[$lang][$key] : $messages['en'][$key];
}

/**
 * Sanitize input
 */
function sanitize($input)
{
    if (is_array($input)) {
        return array_map('sanitize', $input);
    }
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email
 */
function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Check for spam patterns
 */
function isSpam($data)
{
    $spamPatterns = [
        '/\b(viagra|cialis|casino|porn|xxx|lottery|winner)\b/i',
        '/\[url=/i',
        '/<a\s+href/i',
        '/http[s]?:\/\/[^\s]+\s+http[s]?:\/\//i', // Multiple URLs
    ];

    $textToCheck = $data['message'] . ' ' . $data['firstName'] . ' ' . $data['lastName'];

    foreach ($spamPatterns as $pattern) {
        if (preg_match($pattern, $textToCheck)) {
            return true;
        }
    }

    // Honeypot check (if website field is filled, it's likely a bot)
    if (! empty($data['website'])) {
        return true;
    }

    return false;
}

/**
 * Simple rate limiting using session
 */
function checkRateLimit()
{
    session_start();

    $currentTime = time();
    $sessionKey  = 'contact_form_requests';

    if (! isset($_SESSION[$sessionKey])) {
        $_SESSION[$sessionKey] = [];
    }

    // Clean old entries
    $_SESSION[$sessionKey] = array_filter($_SESSION[$sessionKey], function ($time) use ($currentTime) {
        return ($currentTime - $time) < RATE_LIMIT_SECONDS;
    });

    // Check if too many requests
    if (count($_SESSION[$sessionKey]) >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }

    // Add current request
    $_SESSION[$sessionKey][] = $currentTime;

    return true;
}

/**
 * Log contact form submission
 */
function logSubmission($data, $success, $error = null)
{
    $logFile = __DIR__ . '/logs/contact_form.log';
    $logDir  = dirname($logFile);

    if (! is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    $logEntry = [
        'timestamp'  => date('Y-m-d H:i:s'),
        'ip'         => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'email'      => $data['email'] ?? 'unknown',
        'success'    => $success,
        'error'      => $error,
    ];

    file_put_contents(
        $logFile,
        json_encode($logEntry) . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

/**
 * Send email
 */
function sendEmail($data)
{
    // Service labels
    $services = [
        'logistics'         => 'Logistics / لجستیک',
        'grain'             => 'Grain Supply / تأمین غلات',
        'grain-supply'      => 'Grain Supply / تأمین غلات',
        'metals'            => 'Industrial Metals / فلزات صنعتی',
        'industrial-metals' => 'Industrial Metals / فلزات صنعتی',
        'general'           => 'General Inquiry / استعلام عمومی',
        'partnership'       => 'Partnership / همکاری',
    ];

    $serviceName = isset($services[$data['service']]) ? $services[$data['service']] : 'Not specified';

    // Build email subject
    $subject = "[AYBARS GLOBAL] New Contact: {$data['firstName']} {$data['lastName']}";

    // Build HTML email body
    $htmlBody = '
    <!DOCTYPE html>
    <html dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); color: #fff; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 10px 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #1e3a5f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
            .field-value { color: #333; font-size: 16px; background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 3px solid #c9a227; }
            .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; white-space: pre-wrap; }
            .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            .meta { font-size: 11px; color: #999; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📬 New Contact Form Submission</h1>
                <p>' . COMPANY_NAME . '</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">' . htmlspecialchars($data['firstName'] . ' ' . $data['lastName']) . '</div>
                </div>
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value"><a href="mailto:' . htmlspecialchars($data['email']) . '">' . htmlspecialchars($data['email']) . '</a></div>
                </div>
                ' . (! empty($data['phone']) ? '
                <div class="field">
                    <div class="field-label">Phone</div>
                    <div class="field-value"><a href="tel:' . htmlspecialchars($data['phone']) . '">' . htmlspecialchars($data['phone']) . '</a></div>
                </div>
                ' : '') . '
                ' . (! empty($data['company']) ? '
                <div class="field">
                    <div class="field-label">Company</div>
                    <div class="field-value">' . htmlspecialchars($data['company']) . '</div>
                </div>
                ' : '') . '
                <div class="field">
                    <div class="field-label">Service of Interest</div>
                    <div class="field-value">' . htmlspecialchars($serviceName) . '</div>
                </div>
                <div class="field">
                    <div class="field-label">Message</div>
                    <div class="message-box">' . nl2br(htmlspecialchars($data['message'])) . '</div>
                </div>
                <div class="meta">
                    <strong>Submission Details:</strong><br>
                    Date: ' . date('F j, Y, g:i a T') . '<br>
                    IP Address: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . '<br>
                    Language: ' . htmlspecialchars($data['lang'] ?? 'en') . '
                </div>
            </div>
            <div class="footer">
                This email was sent from the contact form at aybarsglobal.com<br>
                © ' . date('Y') . ' AYBARS GLOBAL TRADING. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    ';

    // Build plain text body as fallback
    $plainBody = "
==============================================
NEW CONTACT FORM SUBMISSION
==============================================

Name: {$data['firstName']} {$data['lastName']}
Email: {$data['email']}
Phone: " . (! empty($data['phone']) ? $data['phone'] : 'Not provided') . "
Company: " . (! empty($data['company']) ? $data['company'] : 'Not provided') . "
Service: {$serviceName}

MESSAGE:
----------------------------------------------
{$data['message']}
----------------------------------------------

Submitted: " . date('F j, Y, g:i a T') . "
IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "
Language: " . ($data['lang'] ?? 'en') . "

==============================================
AYBARS GLOBAL TRADING
==============================================
";

    // Email headers
    $boundary = md5(time());
    $headers  = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'From: ' . COMPANY_NAME . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
    ];

    // Build multipart message
    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $plainBody . "\r\n\r\n";
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    $body .= "--{$boundary}--";

    // Send email
    $sent = mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

    // Send auto-reply to sender
    if ($sent) {
        sendAutoReply($data);
    }

    return $sent;
}

/**
 * Send auto-reply email to the sender
 */
function sendAutoReply($data)
{
    $lang = $data['lang'] ?? 'en';

    $subjects = [
        'en' => 'Thank you for contacting AYBARS GLOBAL TRADING',
        'fa' => 'با تشکر از تماس شما با آی‌بارس گلوبال تجارت',
        'ar' => 'شكراً لتواصلك مع أيبارس جلوبال للتجارة',
        'tr' => 'AYBARS GLOBAL TİCARET ile iletişime geçtiğiniz için teşekkürler',
        'ru' => 'Спасибо за обращение в AYBARS GLOBAL TRADING',
    ];

    $subject = isset($subjects[$lang]) ? $subjects[$lang] : $subjects['en'];

    $htmlBody = getAutoReplyTemplate($data, $lang);

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . COMPANY_NAME . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . RECIPIENT_EMAIL,
    ];

    mail($data['email'], $subject, $htmlBody, implode("\r\n", $headers));
}

/**
 * Get auto-reply email template
 */
function getAutoReplyTemplate($data, $lang)
{
    $dir   = in_array($lang, ['fa', 'ar']) ? 'rtl' : 'ltr';
    $align = in_array($lang, ['fa', 'ar']) ? 'right' : 'left';

    $content = [
        'en' => [
            'greeting' => 'Dear ' . htmlspecialchars($data['firstName']),
            'thanks'   => 'Thank you for contacting AYBARS GLOBAL TRADING.',
            'received' => 'We have received your message and will get back to you within 24-48 business hours.',
            'summary'  => 'Here is a summary of your inquiry:',
            'regards'  => 'Best Regards,',
            'team'     => 'AYBARS GLOBAL TRADING Team',
        ],
        'fa' => [
            'greeting' => htmlspecialchars($data['firstName']) . ' عزیز',
            'thanks'   => 'از تماس شما با آی‌بارس گلوبال تجارت متشکریم.',
            'received' => 'پیام شما دریافت شد و ظرف ۲۴ تا ۴۸ ساعت کاری با شما تماس خواهیم گرفت.',
            'summary'  => 'خلاصه درخواست شما:',
            'regards'  => 'با احترام،',
            'team'     => 'تیم آی‌بارس گلوبال تجارت',
        ],
        'ar' => [
            'greeting' => 'عزيزي ' . htmlspecialchars($data['firstName']),
            'thanks'   => 'شكراً لتواصلك مع أيبارس جلوبال للتجارة.',
            'received' => 'لقد تلقينا رسالتك وسنعود إليك خلال 24-48 ساعة عمل.',
            'summary'  => 'ملخص استفسارك:',
            'regards'  => 'مع أطيب التحيات،',
            'team'     => 'فريق أيبارس جلوبال للتجارة',
        ],
        'tr' => [
            'greeting' => 'Sayın ' . htmlspecialchars($data['firstName']),
            'thanks'   => 'AYBARS GLOBAL TİCARET ile iletişime geçtiğiniz için teşekkür ederiz.',
            'received' => 'Mesajınız alınmıştır ve 24-48 iş saati içinde size geri dönüş yapacağız.',
            'summary'  => 'Talebinizin özeti:',
            'regards'  => 'Saygılarımızla,',
            'team'     => 'AYBARS GLOBAL TİCARET Ekibi',
        ],
        'ru' => [
            'greeting' => 'Уважаемый(ая) ' . htmlspecialchars($data['firstName']),
            'thanks'   => 'Благодарим вас за обращение в AYBARS GLOBAL TRADING.',
            'received' => 'Мы получили ваше сообщение и свяжемся с вами в течение 24-48 рабочих часов.',
            'summary'  => 'Краткое содержание вашего запроса:',
            'regards'  => 'С уважением,',
            'team'     => 'Команда AYBARS GLOBAL TRADING',
        ],
    ];

    $c = isset($content[$lang]) ? $content[$lang] : $content['en'];

    return '
    <!DOCTYPE html>
    <html dir="' . $dir . '">
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); color: #fff; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0 0 10px; font-size: 28px; }
            .content { padding: 40px 30px; text-align: ' . $align . '; }
            .message-box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-' . ($dir === 'rtl' ? 'right' : 'left') . ': 4px solid #c9a227; }
            .footer { background: #1e3a5f; color: #fff; padding: 30px; text-align: center; }
            .footer a { color: #c9a227; text-decoration: none; }
            .social { margin-top: 20px; }
            .social a { display: inline-block; margin: 0 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>AYBARS GLOBAL TRADING</h1>
            </div>
            <div class="content">
                <p><strong>' . $c['greeting'] . ',</strong></p>
                <p>' . $c['thanks'] . '</p>
                <p>' . $c['received'] . '</p>
                <p><strong>' . $c['summary'] . '</strong></p>
                <div class="message-box">
                    ' . nl2br(htmlspecialchars(substr($data['message'], 0, 500))) . (strlen($data['message']) > 500 ? '...' : '') . '
                </div>
                <p>' . $c['regards'] . '<br><strong>' . $c['team'] . '</strong></p>
            </div>
            <div class="footer">
                <p>AYBARS GLOBAL TRADING</p>
                <p>Istanbul, Turkey</p>
                <p><a href="mailto:info@aybarsglobal.com">info@aybarsglobal.com</a></p>
                <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">© ' . date('Y') . ' AYBARS GLOBAL TRADING. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ';
}

// ============================================
// MAIN EXECUTION
// ============================================

try {
    // Get language
    $lang = isset($_POST['lang']) ? sanitize($_POST['lang']) : 'en';
    if (! in_array($lang, ['en', 'fa', 'ar', 'tr', 'ru'])) {
        $lang = 'en';
    }

    // Check rate limit
    if (! checkRateLimit()) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => getMessage('error_rate_limit', $lang),
        ]);
        exit();
    }

    // Get and sanitize form data
    $data = [
        'firstName' => isset($_POST['firstName']) ? sanitize($_POST['firstName']) : '',
        'lastName'  => isset($_POST['lastName']) ? sanitize($_POST['lastName']) : '',
        'email'     => isset($_POST['email']) ? sanitize($_POST['email']) : '',
        'phone'     => isset($_POST['phone']) ? sanitize($_POST['phone']) : '',
        'company'   => isset($_POST['company']) ? sanitize($_POST['company']) : '',
        'service'   => isset($_POST['service']) ? sanitize($_POST['service']) : '',
        'message'   => isset($_POST['message']) ? sanitize($_POST['message']) : '',
        'privacy'   => isset($_POST['privacy']) ? true : false,
        'website'   => isset($_POST['website']) ? $_POST['website'] : '', // Honeypot
        'lang'      => $lang,
    ];

    // Validate required fields
    if (empty($data['firstName']) || empty($data['lastName']) || empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => getMessage('error_required', $lang),
        ]);
        logSubmission($data, false, 'Missing required fields');
        exit();
    }

    // Validate email
    if (! isValidEmail($data['email'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => getMessage('error_email', $lang),
        ]);
        logSubmission($data, false, 'Invalid email');
        exit();
    }

    // Validate message length
    if (strlen($data['message']) > MAX_MESSAGE_LENGTH) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => getMessage('error_message_length', $lang),
        ]);
        logSubmission($data, false, 'Message too long');
        exit();
    }

    // Check for spam
    if (isSpam($data)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => getMessage('error_spam', $lang),
        ]);
        logSubmission($data, false, 'Spam detected');
        exit();
    }

    // Send email
    $sent = sendEmail($data);

    if ($sent) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => getMessage('success', $lang),
        ]);
        logSubmission($data, true);
    } else {
        throw new Exception('Mail function returned false');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => getMessage('error_general', $lang ?? 'en'),
    ]);
    logSubmission($data ?? [], false, $e->getMessage());
}
