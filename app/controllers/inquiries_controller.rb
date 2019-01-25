class InquiriesController < ApplicationController
  def new
  end

  def create
    redirect_to new_inquiry_path
  end

end