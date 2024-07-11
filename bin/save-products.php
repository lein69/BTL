<?php
// Lấy dữ liệu POST từ request
$postData = file_get_contents('php://input');
$products = json_decode($postData, true);

// Kiểm tra và ghi dữ liệu vào file products.json
if ($products !== null) {
    $jsonContent = json_encode($products, JSON_PRETTY_PRINT);
    file_put_contents('products.json', $jsonContent);
    echo json_encode(['message' => 'Products updated successfully']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid data received']);
}
?>
