<script setup>
import MainHero from '@/components/MainHero.vue'
</script>

<template>
  <main>
    <MainHero
    subheading="Contacto"
    image="bg_2"
    heading="Contacta con nosotros"
  />
    <section class="ftco-section contact-section">
    <div class="container mt-5">
      <div class="row block-9">
        <div class="col-md-4 contact-info ">
          <div class="row">
            <div class="col-md-12 mb-4">
              <h2 class="h4">Contact Information</h2>
            </div>
            <div class="col-md-12 mb-3">
              <p><span>Address:</span> Calle Manuel de Falla 3, 29004 Málaga</p>
            </div>
            <div class="col-md-12 mb-3">
              <p><span>Phone:</span> <a href="tel://+34603258049">+34603258049</a></p>
            </div>
            <div class="col-md-12 mb-3">
              <p><span>Email:</span> <a href="mailto:mohamed.diagne@unchk.edu.sn">mohamed.diagne@unchk.edu.sn</a></p>
            </div>
            <div class="col-md-12 mb-3">
              <p><span>Website:</span> <a href="#">pizza-delicious.com</a></p>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-6 ">
          <form action="#" class="contact-form">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Your Name">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Your Email">
                </div>
                </div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Subject">
            </div>
            <div class="form-group">
              <textarea name="" id="" cols="30" rows="7" class="form-control" placeholder="Message"></textarea>
            </div>
            <div class="form-group">
              <input type="submit" value="Send Message" class="btn btn-primary py-3 px-5">
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>
