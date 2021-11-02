<template>
    <div
        class="toast align-items-center text-white position-absolute end-0"
        :class="color"
        style="top: 60px;"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-animation="true"
        data-bs-delay="2000"
    >
        <div class="d-flex">
            <div class="toast-body">
                {{ message }}
            </div>
            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
        </div>
    </div>
</template>
<script>
export default {
    name: "Notification",
    props: {
        type: { type: String, default: "info" },
        message: { type: String, default: "提示..." },
        color: { type: String, default: "bg-info" }
    },
    methods: {
        showToast() {
            var myToastEl = document.querySelector(".toast");
            var toast = new bs.Toast(myToastEl);
            toast.show();
        }
    }
};
</script>
