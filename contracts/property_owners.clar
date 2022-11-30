
;; property_owners
(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token property_owners uint)

;; constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u010))
(define-constant err-not-token-owner (err u020))
(define-constant err-not-exsists (err u030))
(define-constant err-metadata-frozen (err u040))

;; data maps and vars
(define-data-var last-token-id uint u0)
(define-data-var metadata-frozon bool false)
(define-data-var token-uri (string-ascii 80) "ipfs://ipfs/QmYjCAdtgUWBhTCym5GHRgiKUpFshZp7ueppPJDZbACQnW/")
(define-data-var owner-frist-name (string-ascii 32) "abcd")
(define-data-var owner-last-name (string-ascii 32) "abcd")
(define-data-var rent-amount uint u0000000)

(define-read-only (get-last-token-id)
	(ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
	(ok none)
)

(define-read-only (get-owner (token-id uint))
	(ok (nft-get-owner? property_owners token-id))
)

(define-read-only (get-name (token-id uint))
	(ok (concat (var-get owner-frist-name) (var-get owner-last-name)))	
)

(define-read-only (get_rent_amount) 
	(ok (var-get rent-amount))
)

;; public functions
(define-public (set-frist-name (frist-name (string-ascii 32))) 
	(begin 
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(var-set owner-frist-name frist-name)
		(ok true)
	)
)

(define-public (set-last-name (last-name (string-ascii 32))) 
	(begin 
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(var-set owner-last-name last-name)
		(ok true)
	)
)

(define-public (set-rent-amount (price uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (var-set rent-amount price))
  )
)

(define-public (set-base-uri (new-base-uri (string-ascii 80))) 
    (begin 
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (not (var-get metadata-frozon))  err-metadata-frozen)
        (var-set token-uri new-base-uri)
        (ok true)
    )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
	(begin
		(asserts! (is-eq tx-sender sender) err-not-token-owner)
		(nft-transfer? property_owners token-id sender recipient)
	)
)

(define-public (mint (recipient principal))
	(let
		(
			(token-id (+ (var-get last-token-id) u1))
		)
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(try! (nft-mint? property_owners token-id recipient))
		(var-set last-token-id token-id)
		(ok token-id)
	)
)

(define-public (freeze-metadata) 
    (begin
        (asserts! (is-eq tx-sender contract-owner) (err err-owner-only))
        (var-set metadata-frozon true)
        (ok true)
    )
)
